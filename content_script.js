const TWEET_LIKE_SELECTOR = ".tweet-context.with-icn span.Icon.Icon--small.Icon--heartBadge";
const TWEET_HIDE_CLASS = "twitterLikeHider";
const isMainFeed = () => document.location.href == "https://twitter.com/" || document.location.href == "https://twitter.com"; 

const hideLikeTweets = () => {

  const isMain = isMainFeed();
  if (!isMain) return;

  const likeTweets = document.querySelectorAll(TWEET_LIKE_SELECTOR);
  const likeTweetsArray = Array.from(likeTweets).map((i) => i.parentElement.parentElement.parentElement).filter(i => !i.classList.contains(TWEET_HIDE_CLASS));
  const likeTweetsNum = likeTweetsArray.length;
  
  if (likeTweetsNum) console.log(`removing ${likeTweetsNum} 'like' Tweets`);
  
  likeTweetsArray.forEach(i => i.classList.add(TWEET_HIDE_CLASS));

  return likeTweetsNum;
};

const showLikeTweets = () => {
  const hiddenLikeTweets = document.querySelectorAll(`.${TWEET_HIDE_CLASS}`);
  hiddenLikeTweets.forEach(i => i.classList.remove(TWEET_HIDE_CLASS));
}

const onMessage = (request, sender, sendResponse) => {
   //console.log("onMessage", request, sender, sendResponse);
  const isMain = isMainFeed();
  //console.log("isMainFeed?", isMain);

  if (isMain) {
    const numTweets = hideLikeTweets();
    sendResponse({type:"numRemoved", value:numTweets});
  }
  else sendResponse({type:"notMain"});

  return true;
 
}
chrome.runtime.onMessage.addListener(onMessage);