// This script is responsible for hiding the offending tweets

// First select all visible tweets, then filter only those with a
// user interaction header of some sort, then filter out 'likes' and
// 'follows' from those

// TWEET_SELECTOR gets *all* of the tweets on the page. It is an
// array because twitter has different versions for different
// locales, so we will select them all if and when necessary
const TWEET_SELECTOR = ["article[role=article]"];

// TWEET_HEADERS these are the selectors for tweets that have an icon,
// usually next to "Retweeted" "Liked" "Follows" "Replied" "Received a
// Reply" and so forth. This is the icon within the header
const TWEET_HEADERS = [
  "svg.r-4qtqp9.r-yyyyoo.r-dnmrzs.r-bnwqim.r-1plcrui.r-lrvibr", // any header icons
];

// Identify the offending tweet by the icon in its header, and hide
// the tweets that have those.
const BLUE_CHECK_ICON =
  "M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z";
const FOLLOW_ICON =
  "M12.225 12.165c-1.356 0-2.872-.15-3.84-1.256-.814-.93-1.077-2.368-.805-4.392.38-2.826 2.116-4.513 4.646-4.513s4.267 1.687 4.646 4.513c.272 2.024.008 3.46-.806 4.392-.97 1.106-2.485 1.255-3.84 1.255zm5.849 9.85H6.376c-.663 0-1.25-.28-1.65-.786-.422-.534-.576-1.27-.41-1.968.834-3.53 4.086-5.997 7.908-5.997s7.074 2.466 7.91 5.997c.164.698.01 1.434-.412 1.967-.4.505-.985.785-1.648.785z";
const HEART_ICON =
  "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z";
const RECEIVED_REPLY_ICON =
  "M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788z";
const RETWEET_ICON =
  "M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z";
const TOPIC_ICON =
  "M18.265 3.314c-3.45-3.45-9.07-3.45-12.52 0-3.45 3.44-3.45 9.06 0 12.51 1.5 1.49 3.43 2.38 5.51 2.56v4.14c0 .31.2.6.5.7.08.03.17.05.25.05.22 0 .44-.1.59-.29l6.49-8.11c2.63-3.49 2.27-8.47-.82-11.56zm-10.56 7.87c0-.41.33-.75.75-.75h4.05c.41 0 .75.34.75.75s-.34.75-.75.75h-4.05c-.42 0-.75-.34-.75-.75zm8.6-3.24c0 .42-.34.75-.75.75h-7.1c-.42 0-.75-.33-.75-.75 0-.41.33-.75.75-.75h7.1c.41 0 .75.34.75.75z";
// TARGET_ICON_PATHS

// This is the name of the CSS class that is added to targeted tweets:
const TWEET_HIDE_CLASS = "twitter-like-hider";

const isMainFeed = () =>
  document.location.href == "https://twitter.com/" ||
  document.location.href == "https://twitter.com" ||
  document.location.href == "https://twitter.com/home";

// isOn holds the on-off state of the extension, toggled when the
// user clicks the icon
let isOn = true;
// scrollTimeout holds the value for the onScroll event
let scrollTimeout;
// holds the number of likeTweets removed
let likeTweetsNum = 0;
// holds the disconnect function for the main element mutation observer
let mutationObserver;
// whether scroll event listener is attached to the dom
let hasScrollListener = false;

const defaultOptions = {
  follows: true,
  likes: true,
  received: false,
  retweeted: false,
  store: true, //
  topics: false,
  verified: false,
};

// holds options
let options = defaultOptions;
// map options to icons
const optionMap = {
  follows: FOLLOW_ICON,
  likes: HEART_ICON,
  received: RECEIVED_REPLY_ICON,
  retweeted: RETWEET_ICON,
  topics: TOPIC_ICON,
  verified: BLUE_CHECK_ICON,
};

const debugLog = (...data) => {
  const isdebug = options && options.debug === true;
  if (isdebug) console.info.apply(null, data);
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  if (chrome.storage)
    chrome.storage.local.get("twitter-like-hider-options", function (items) {
      const storedOptions = items["twitter-like-hider-options"];
      options = storedOptions ? storedOptions : options;
      debugLog(
        "TwitterLikesHider: debug mode console logging is ENABLED. To turn it off, open extension options and uncheck",
        items,
        options
      );
    });
  else {
    debugLog(
      "TwitterLikesHider: storage not permitted, using default options",
      options
    );
    options = defaultOptions;
  }
}

const hideLikeTweets = () => {
  const isMain = isMainFeed();
  debugLog(
    "TwitterLikesHider: hideLikeTweets:isMain?",
    isMain,
    document.location.href
  );
  if (!isMain) return;
  const allTweets = Array.from(document.querySelectorAll(TWEET_SELECTOR));
  const tweetsWithHeaders = allTweets.filter((tweet) =>
    TWEET_HEADERS.some((selector) => !!tweet.querySelector(selector))
  );

  debugLog("TwitterLikesHider:hideLikeTweets:allTweets", allTweets);
  debugLog(
    "TwitterLikesHider:hideLikeTweets:tweetsWithHeaders",
    tweetsWithHeaders.map((t) => [t.innerText, t])
  );

  // These are the icons of the types of tweets that are set to
  // 'true' in options and are used to find offending tweets
  const offendingTweetIcons = Object.keys(options)
    .filter((key) => optionMap[key])
    .filter((key) => options[key])
    .map((key) => optionMap[key]);

  const offendingTweets = tweetsWithHeaders.filter(
    (tweet) =>
      tweet.querySelector(TWEET_HEADERS) &&
      offendingTweetIcons.some((path) =>
        tweet.querySelector(TWEET_HEADERS).innerHTML.includes(path)
      )
  );
  offendingTweets.forEach((tweet) => tweet.classList.add(TWEET_HIDE_CLASS));
  debugLog("TwitterLikesHider: hideLikeTweets()", {
    likeTweetsNum,
    offendingTweets,
    options,
  });
  likeTweetsNum = offendingTweets.length;
};
const showLikeTweets = () => {
  const hiddenLikeTweets = document.querySelectorAll(`.${TWEET_HIDE_CLASS}`);
  hiddenLikeTweets.forEach((i) => i.classList.remove(TWEET_HIDE_CLASS));
  return hiddenLikeTweets.length;
};

const hideIfMain = (sendResponse) => {
  const onScrollEnd = () => {
    // When the user *stops* scrolling, search for and hide any
    // offending tweet
    debugLog("TwitterLikesHider:content:onScrollEnd", isOn);
    if (isOn) hideLikeTweets();
    if (mutationObserver) {
      debugLog(
        "TwitterLikesHider:content:onScrollEnd:mutationObserver",
        mutationObserver
      );
      mutationObserver.disconnect();
      mutationObserver = null;
    }
  };
  const onScrollListener = (e) => {
    // Twitter dynamically adds and removes Tweets when the user
    // scrolls, so the scroll listener listens for a scroll event. But
    // doing anything on a scroll event can effect performance because
    // this event is triggered many times per second. Therefore, this
    // event is `debounced`, or only activated when the user *stops*
    // scrolling.
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(onScrollEnd, 100);
  };
  const isMain = isMainFeed();
  debugLog(
    `TwitterLikesHider: isMain? ${isMain} @ href:${document.location.href}`
  );
  if (isMain) {
    if (!hasScrollListener) {
      document.addEventListener("scroll", onScrollListener);
      debugLog("TwitterLikesHider: scroll listener added");
      hasScrollListener = true;
    }
    hideLikeTweets();
    if (sendResponse) sendResponse({ type: "isOn", value: likeTweetsNum });
  }
};
/**
 * onMessage receives and handles messages from 'background.js', and
 * returns messages via the `sendResponse` method
 **/
const onMessage = (message, sender, sendResponse) => {
  debugLog("TwitterLikesHider:content:onMessage", message);

  switch (message.type) {
    case "toggle":
      isOn = !isOn;
      debugLog("TwitterLikesHider:isOn", isOn);
      if (mutationObserver) {
        debugLog(
          "TwitterLikesHider:content:onScrollEnd:mutationObserver",
          mutationObserver
        );
        mutationObserver.disconnect();
        mutationObserver = null;
      }
    // no break deliberate
    case "webNavigation":
    case "alarm":
      if (isOn) hideIfMain(sendResponse);
      else {
        showLikeTweets();
        sendResponse({ type: "isOff" });
        debugLog("TwitterLikesHider: scroll listener removed");
        // document.removeEventListener("scroll", onScrollListener);
        break;
      }
      break;

    case "optionChange":
      debugLog("TwitterLikesHider: optionChange", { message });
      options = message.value;
      hideLikeTweets();
      break;

    default:
      console.error(
        `TwitterLikesHider error: unknown message ${message.type} sent to content_script.js`,
        message
      );
      break;
  }
  return true;
};

const onDomLoaded = () => {
  debugLog("TwitterLikesHider: onDomLoaded");
  hideIfMain();

  // Sometimes the first tweet on page load is an offending tweet
  // Without attention, this tweet will remain until the user scrolls
  // Add a mutation observer for the time when the page has loaded
  // but the user has not yet scrolled. Since mutation observer
  // triggers several times a second, remove it again once the user
  // scrolls

  let targetNode = document.querySelector("#react-root");
  debugLog("TwitterLikesHider:targetNode", targetNode);
  mutationObserver = new MutationObserver(() => hideIfMain());
  mutationObserver.observe(targetNode, {
    attributes: false,
    childList: true,
    subtree: true,
  });
};

const contentSetup = () => {
  chrome.runtime.onMessage.addListener(onMessage);
  if (chrome.storage) chrome.storage.onChanged.addListener(restoreOptions);
  restoreOptions();
  if (document.readyState === "loading")
    document.addEventListener("load", onDomLoaded);
  else onDomLoaded();
};

contentSetup();
