const TWEET_LIKE_SELECTOR = ".tweet-context.with-icn";
//const TWEET_HIDE_CLASS = "tweetLikeHide";
const isMainFeed = () => document.location.href == "https://twitter.com/" || document.location.href == "https://twitter.com"; 

const hideLikeTweets = () => {

  const isMain = isMainFeed();
  if (!isMain) return;

  const likeTweets = document.querySelectorAll(TWEET_LIKE_SELECTOR);
  const likeTweetsArray = Array.from(likeTweets).map((i) => i.parentElement.parentElement).filter(i => i.style.display !== "none");
  const likeTweetsNum = likeTweetsArray.length;
  
  if (likeTweetsNum) console.log(`removing ${likeTweetsNum} 'like' Tweets`);
  
  likeTweetsArray.forEach(i => i.style.display = "none");

  return likeTweetsNum;
};

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