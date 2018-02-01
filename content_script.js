const TWEET_LIKE_SELECTOR = ".tweet-context.with-icn span.Icon.Icon--small.Icon--heartBadge";
const TWEET_FOLLOWS_SELECTOR = ".tweet-context.with-icn span.Icon.Icon--small.Icon--follower";
const TWEET_HIDE_CLASS = "twitterLikeHider";
const isMainFeed = () => document.location.href == "https://twitter.com/" || document.location.href == "https://twitter.com";

let isOn = true;

const hideLikeTweets = () => {

  const isMain = isMainFeed();
  if (!isMain) return;

  const likeTweets = document.querySelectorAll(TWEET_LIKE_SELECTOR + "," + TWEET_FOLLOWS_SELECTOR);
  const likeTweetsArray = Array.from(likeTweets).map((i) => i.parentElement.parentElement.parentElement).filter(i => !i.classList.contains(TWEET_HIDE_CLASS));
  const likeTweetsNum = likeTweetsArray.length;

  if (likeTweetsNum) console.log(`removing ${likeTweetsNum} 'like' Tweets`);

  likeTweetsArray.forEach(i => i.classList.add(TWEET_HIDE_CLASS));

  return likeTweetsNum;
};

const showLikeTweets = () => {
  const hiddenLikeTweets = document.querySelectorAll(`.${TWEET_HIDE_CLASS}`);
  hiddenLikeTweets.forEach(i => i.classList.remove(TWEET_HIDE_CLASS));
  return hiddenLikeTweets.length;
}

const onMessage = (message, sender, sendResponse) => {
  //console.log("onMessage", message);
  switch (message.type) {
    case 'toggle':
      isOn = !isOn;
      if (!isOn) {
        const numTweets = showLikeTweets();
      }
    // no break deliberate
    case 'webNavigation':
    case 'alarm':
      if (!isOn) {
        sendResponse({ type: "isOff" });
        break;
      }

      const isMain = isMainFeed();
      if (isMain) {
        const numTweets = hideLikeTweets();

        if (numTweets) {
          sendResponse({ type: "removedLikes", value: numTweets });
        }
        else sendResponse({ type: "isMain" });
      }
      else sendResponse({ type: "notMain" });

      break;
    default:
      console.error("unknown message sent to content_script.js", message);
      break;
  }

  return true;

}
chrome.runtime.onMessage.addListener(onMessage);