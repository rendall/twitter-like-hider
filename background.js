/*
This Chrome extension has two components running on separate threads:

1) background.js runs in the extension background.     background.js does not have access to the page's content but it has access to the chrome api.

2) content_script.js has access to the content of the page, which is necessary to hide the relevant tweets, but not to the chrome api.

background.js and content_script.js communicate with each other via a message api linked to the browser *tab*, and the specific tab must be specified by number (here denoted 'tabId').

From the chrome api, the extension needs to know:
1) when there is a navigation ('webNavigation') so that it can hide the relevant tweets.
2) since Twitter loads information after webNavigation fires, we also need to fire an 'alarm' periodically.
3) Those two require user permissions, specificed in the manifest.json 
4) 'pageAction' and 'tabs' are chrome apis also used in this extension.

*/

const ALARM_PREFIX = "twitterLikeHiderAlarm";
let totalRemoved = 0;

/** onResponse receives and handles messages from content_script.js
 **/
const onResponse = (tabId) => (response) => {
  if (response)
    switch (response.type) {
      case "isOff":
        totalRemoved = 0;
        chrome.pageAction.setTitle({
          title: `Showing all likes`,
          tabId: tabId,
        });
        chrome.pageAction.setIcon({
          path: {
            16: "icon-off-16.png",
            24: "icon-off-24.png",
            32: "icon-off-32.png",
          },
          tabId: tabId,
        });
        chrome.alarms.clearAll();
        break;
      case "isOn":
        totalRemoved = response.value;
        chrome.pageAction.setTitle({
          title: `Hiding ${totalRemoved} ${totalRemoved === 1 ? "tweet" : "tweets"
            }`,
          tabId: tabId,
        });
        chrome.pageAction.setIcon({
          path: {
            16: "icon-16.png",
            24: "icon-24.png",
            32: "icon-32.png",
          },
          tabId: tabId,
        });
        createOrContinueAlarm(tabId);
        break;
      default:
        console.error(`unknown response`, response);
        break;
    }
};

const createOrContinueAlarm = (tabId) => {
  const alarmName = `${ALARM_PREFIX}-${tabId}`;
  const onAlarmDetails = (alarm) => {
    if (alarm === undefined)
      // If the user does not scroll, give Twitter 7.5 seconds to load
      // and then trigger a removal of tweets:
      chrome.alarms.create(alarmName, { when: 7500, periodInMinutes: 1 });
  };
  chrome.alarms.get(alarmName, onAlarmDetails);
};

/** The user clicking the entension icon turns the extension on
 * and off */
const onIconClicked = (e) => {
  const tabId = e.id;
  chrome.tabs.sendMessage(tabId, { type: "toggle" }, onResponse(tabId));
};

const onAlarm = (alarm) => {
  const alarmName = alarm.name;
  if (alarmName.indexOf("-") < 0) return;
  const tabId = parseInt(alarmName.split("-")[1]);
  chrome.tabs.sendMessage(tabId, { type: "alarm" }, onResponse(tabId));
};

const onNavToTwitter = (e) => {
  const tabId = e.tabId;
  chrome.pageAction.show(tabId);
  chrome.tabs.sendMessage(tabId, { type: "webNavigation" }, onResponse(tabId));
};

chrome.webNavigation.onCompleted.addListener(onNavToTwitter, {
  url: [{ hostContains: "twitter.com" }],
});
chrome.pageAction.onClicked.addListener(onIconClicked);
chrome.alarms.onAlarm.addListener(onAlarm);
