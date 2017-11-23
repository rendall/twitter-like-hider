let totalRemoved = 0;


const onResponse = (tabId) => (response) => {
    if (response) switch (response.type) {
        case "isOff":
            totalRemoved = 0;
            chrome.pageAction.setTitle({ title: `Showing all likes`, tabId: tabId });
            chrome.pageAction.setIcon({
                path: {
                    "16": "icon-off-16.png",
                    "24": "icon-off-24.png",
                    "32": "icon-off-32.png"
                },
                tabId: tabId
            });
        case "notMain":
            break;
        case "removedLikes":
            totalRemoved += response.value;
        case "isMain":
            if (totalRemoved > 0) chrome.pageAction.setTitle({ title: `Hiding ${totalRemoved} ${totalRemoved === 1 ? "like" : "likes"}`, tabId: tabId });
            chrome.pageAction.setIcon({
                path: {
                    "16": "icon-16.png",
                    "24": "icon-24.png",
                    "32": "icon-32.png"
                },
                tabId: tabId
            })
            break;
        default:
            console.error(`unknown response`, response);
            break;
    }
};
const onIconClicked = (e) => {
    const tabId = e.id;
    chrome.tabs.sendMessage(tabId, { type: "toggle" }, onResponse(tabId));
}

const onNavToTwitter = (e) => {
    const tabId = e.tabId;
    chrome.pageAction.show(tabId);
    chrome.tabs.sendMessage(tabId, { type: "webNavigation" }, onResponse(tabId));
};

chrome.webNavigation.onCompleted.addListener(onNavToTwitter, { url: [{ hostContains: 'twitter.com' }] });
chrome.pageAction.onClicked.addListener(onIconClicked);