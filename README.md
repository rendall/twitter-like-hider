![Twitter Likes Hider](icon-48.png)

# Twitter 'Likes' Hider

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/dkcgnebncpfljfaaplmedjnfjifffagj)](https://chrome.google.com/webstore/detail/twitter-likes-hider/dkcgnebncpfljfaaplmedjnfjifffagj)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/price/dkcgnebncpfljfaaplmedjnfjifffagj)](https://chrome.google.com/webstore/detail/twitter-likes-hider/dkcgnebncpfljfaaplmedjnfjifffagj)

## TL;DR

While you can block, mute and mute retweets, on occasion Twitter will show you what someone you follow 'likes' or 'follows', and there is no way to mute that. This extension will hide those 'like' and 'follow' tweets, and let you toggle them on and off.

## Intro

Are you on Twitter, but need to ensure that no wrongthink invades your echo chamber? Want to seal your filter bubble even tighter? Got all the idiots blocked, the dummies muted, and problematic retweets banned from your feed?

There is yet one more crack in your Twitter dam: sometimes, annoyingly, Twitter will show you what other people in your newsfeed 'like'. Who cares? You do! There you are, deep in harmonious clicktrance, seeing only ideas that make you happy, and then suddenly, Twitter shows you the 'like' of some misguided follower, and now your harmony is ruined as you spend the next several hours arguing with strangers on the internet. There is no way to block this either!

Until now.

**Twitter 'Likes' Hider** prevents that unhappy occurrence. Install it and be bothered no more with the likes and preferences of stupid, crazy and bad people!

Note that **Twitter 'Likes' Hider** works only on your main Twitter feed. If you visit a profile and see something horrible that they like, well, you have only yourself to blame, don't you.

NB: All of the above was irony, doncha know. Please do not call people you disagree with "idiots", and do broaden your political and social circles!

## Installation

Install the extension on Chrome via the Web Store link below, or download / clone the source code into a local directory, and then follow these instructions from Google to install it on your browser as a developer. https://developer.chrome.com/extensions/getstarted#unpacked

On the Chrome Web Store:
https://chrome.google.com/webstore/detail/twitter-likes-hider/dkcgnebncpfljfaaplmedjnfjifffagj

## Instructions

After installing, the **Twitter 'Likes' Hider** icon will be visible to the right of your Chrome address bar. It will be active when visiting Twitter, and grayed out while visiting any other website.

Clicking on the icon while active will toggle the view of the 'liked' tweets from hidden to visible and back again.

- Active icon (extension is active and tweets are hidden): ![Logo when active](icon-32.png)
- Inactive icon (extension is inactive and all tweets are visible): ![Logo inactive](icon-off-32.png)

To see how many tweets are hidden, hover your cursor over the icon. If it has hidden any tweets, it will tell you how many. Or it will display:

- _Showing all likes_: the extension has been toggled to show 'liked' tweets. Click the icon to hide them.

It is possible to hide other kinds of Tweets. To change the kinds of Tweets that are hidden, right-click on the extension icon and select _Options_. A new Chrome tab will open with a list of labeled checkboxes. Check the boxes next to the kinds of tweets you would like to hide: _Likes_, _Follows_, _Retweets_, or _Verified accounts / "Blue Check"_. The click the _Save_ button to apply the changes. It may be necessary to reload Twitter.

### Known bugs

- _Twitter Like Hider_ does not work for some users. If it does not work for you, contact me and we can figure it out. I suspect that Twitter has different versions for various countries.
- Sometimes targeted Tweets are not hidden, especially if many show at once. Scrolling the page a little usually hides them.

## Privacy Policy

The creator of **Twitter 'Likes' Hider** has zero interest in tracking you. Your privacy is sacrosanct. No data will be kept, tracked, transferred, sold, traded, nor even coveted in any respect, from now until the end of time.

## Have a comment? Question? Feature request?

My preference is that you create an issue ticket on Github, here: https://github.com/rendall/twitter-like-hider/issues Just click the 'New issue' button and type away.

## Open Source!

This extension is open source, which means you can see how it works yourself and even contribute to the project.
More details here: https://github.com/rendall/twitter-like-hider

## Change Log

### Bugfix 1.6.1

- The extension worked only for 'Dim' background mode. This fix allows for 'Default' and 'Lights Out' modes as well.
  - Other minor fixes:
  - Announce that 'Enable debug mode' is ON (if so) and inform user how to turn it off (in browser console).
  - Remove extraneous unused variable assignment.

### New in release 1.6

- Options! Right-click on the extension icon, select 'Options'.
  - This shows a list of the types of Twits the 'Twitter Like Hider' can hide. Check a box to show them, _un_-check a box to hide them.
  - Options are stored locally on the computer's browser
- Expands the types of Twits that can be hidden:
  - 'Likes'
  - 'Follows'
  - 'Retweeted'
  - 'Received a reply'
  - 'Replied'
- Rudimentary troubleshooting or 'debug' mode, enabled via options

### New in release 1.5

Twitter made the mistake of showing me 'like' and 'follows' Twits again, so I jumped on updating this immediately to hide the new Twits. I made it easier to update this in future and this version should eliminate the minute-long pause before the Twits are hidden
