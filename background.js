let totalRemoved = 0;

const onNavToTwitter = (e) => {
    //console.log("onWebNavComplete", e);
    const tabId = e.tabId;

    const onResponse = (response) => {
        //console.log(response);
        switch (response.type) {
            case "notMain":

                break;

            case "numRemoved":
                totalRemoved += response.value;

                chrome.pageAction.show(tabId);
                if (response.value) console.log("removed likes:", totalRemoved);
                break;

            default:
                console.error(`unknown response`, response);
                break;
        }
   };

    chrome.tabs.sendMessage(tabId, { type: "webNavigation" }, onResponse);
};


chrome.webNavigation.onCompleted.addListener(onNavToTwitter, { url: [{ hostContains: 'twitter.com' }] });
