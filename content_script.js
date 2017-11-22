// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.executeScript({
//         code: 'document.body.style.backgroundColor="red"'
//     });
// });

//console.log("twitterLikeHider");
const isMainFeed = () => document.location.href == "https://twitter.com/" || document.location.href == "https://twitter.com"; 

const removeLikeTweets = () => {

  const isMain = isMainFeed();
  //console.log("isMainFeed?", isMain);
  if (!isMainFeed()) return;



  const likeTweets = document.querySelectorAll(".tweet-context.with-icn");
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
    const numTweets = removeLikeTweets();
    sendResponse({type:"numRemoved", value:numTweets});
  }
  else sendResponse({type:"notMain"});

  return true;
 
}
chrome.runtime.onMessage.addListener(onMessage);