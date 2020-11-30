// This script is responsible for hiding the offending tweets
// First is identifies all of the tweets on the page
// Then it filters those which are 'liked'

// TWEET_SELECTOR gets *all* of the tweets on the page
const TWEET_SELECTOR = ["article[role=article]"];

// TWEET_HEADERS these are the selectors for tweets that have an icon, usually next to "Retweeted" "Liked" "Follows" "Replied" "Received a Reply" and so forth
const TWEET_HEADERS = [
  "svg.r-111h2gw.r-4qtqp9.r-yyyyoo.r-1xvli5t.r-dnmrzs.r-bnwqim.r-1plcrui.r-lrvibr.r-1xzupcd",
];

const FOLLOW_ICON =
  "M12.225 12.165c-1.356 0-2.872-.15-3.84-1.256-.814-.93-1.077-2.368-.805-4.392.38-2.826 2.116-4.513 4.646-4.513s4.267 1.687 4.646 4.513c.272 2.024.008 3.46-.806 4.392-.97 1.106-2.485 1.255-3.84 1.255zm5.849 9.85H6.376c-.663 0-1.25-.28-1.65-.786-.422-.534-.576-1.27-.41-1.968.834-3.53 4.086-5.997 7.908-5.997s7.074 2.466 7.91 5.997c.164.698.01 1.434-.412 1.967-.4.505-.985.785-1.648.785z";
const HEART_ICON =
  "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z";
// TARGET_ICON_PATHS is how the heart icon is represented in Twitter
const TARGET_ICON_PATHS = [HEART_ICON, FOLLOW_ICON];

// This is the name of the CSS class that is added to targeted tweets:
const TWEET_HIDE_CLASS = "twitter-like-hider";

const isMainFeed = () =>
  document.location.href == "https://twitter.com/" ||
  document.location.href == "https://twitter.com" ||
  document.location.href == "https://twitter.com/home";

let isOn = true;

const hideLikeTweets = () => {
  const isMain = isMainFeed();
  if (!isMain) return;

  const allTweets = Array.from(document.querySelectorAll(TWEET_SELECTOR));
  const tweetsWithHeaders = allTweets.filter((tweet) =>
    TWEET_HEADERS.some((selector) => !!tweet.querySelector(selector))
  );
  const offendingTweets = tweetsWithHeaders.filter(
    (tweet) =>
      tweet.querySelector(TWEET_HEADERS) &&
      TARGET_ICON_PATHS.some((path) =>
        tweet.querySelector(TWEET_HEADERS).innerHTML.includes(path)
      )
  );

  offendingTweets.forEach((tweet) => tweet.classList.add(TWEET_HIDE_CLASS));

  const likeTweetsNum = offendingTweets.length;
  const count = offendingTweets
    .map((tweet) =>
      tweet.querySelector(
        "span.css-901oao.css-16my406.r-1qd0xha.r-ad9z0x.r-bcqeeo.r-qvutc0"
      )
    )
    .map((e) => e.textContent)
    .reduce(
      (acc, txt) =>
        txt.endsWith("liked")
          ? { ...acc, liked: acc.liked + 1 }
          : { ...acc, liked: acc.follows + 1 },
      { liked: 0, follows: 0 }
    );

  console.log({ follows: count.follows, offendingTweets, likeTweetsNum });

  sendResponse({ type: "removedLikes", value: likeTweetsNum });

  return likeTweetsNum;
};

const showLikeTweets = () => {
  const hiddenLikeTweets = document.querySelectorAll(`.${TWEET_HIDE_CLASS}`);
  hiddenLikeTweets.forEach((i) => i.classList.remove(TWEET_HIDE_CLASS));
  return hiddenLikeTweets.length;
};

let scrollTimeout;
const onScrollEnd = () => {
  if (isOn) hideLikeTweets();
};

const onScrollListener = (e) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(onScrollEnd, 100);
};

const onMessage = (message, sender, sendResponse) => {
  switch (message.type) {
    case "toggle":
      isOn = !isOn;
    // no break deliberate
    case "webNavigation":
    case "alarm":
      document.removeEventListener("scroll", onScrollListener);
      if (!isOn) {
        showLikeTweets();
        sendResponse({ type: "isOff" });
        break;
      }
      sendResponse({ type: "isOn" });
      const isMain = isMainFeed();
      if (isMain) {
        document.addEventListener("scroll", onScrollListener);
        sendResponse({ type: "isMain" });
        hideLikeTweets();
        console.log("isMain")
      } else {
        sendResponse({ type: "notMain" });
        console.log("notMain")
      }
      break;
    default:
      console.error("unknown message sent to content_script.js", message);
      break;
  }
  return true;
};
chrome.runtime.onMessage.addListener(onMessage);
