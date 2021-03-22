![Twitter Likes Hider](icon-48.png)

# Twitter 'Likes' Hider

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/dkcgnebncpfljfaaplmedjnfjifffagj)](https://chrome.google.com/webstore/detail/twitter-likes-hider/dkcgnebncpfljfaaplmedjnfjifffagj)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/price/dkcgnebncpfljfaaplmedjnfjifffagj)](https://chrome.google.com/webstore/detail/twitter-likes-hider/dkcgnebncpfljfaaplmedjnfjifffagj)

Twitter puts tweets in your feed that someone else 'likes' or 'follows', or suggests 'topics'. This extension allows you to hide those and other similar tweets.

![Screenshot of hypothetical offending Tweet](https://lh3.googleusercontent.com/xD-40V-VNvO8yI4s36E8UtfpKfyfiakeA1URh_8g0lPEHscJ00GENrN2OMzmigpwektHWiOo8hB6UV8HwDhELJZ6=w640-h400-e365-rj-sc0x00ffffff)

## Instructions

After installing, the **Twitter 'Likes' Hider** icon will be visible to the right of your Chrome address bar. It will be active when visiting Twitter, and grayed out while visiting any other website.

Clicking on the icon while active will toggle the view of the 'liked' tweets from hidden to visible and back again.

- Active icon (extension is active and tweets are hidden): ![Logo when active](icon-32.png)
- Inactive icon (extension is inactive and all tweets are visible): ![Logo inactive](icon-off-32.png)

To see how many tweets are hidden, hover your cursor over the icon. If it has hidden any tweets, it will tell you how many. Or it will display:

- _Showing all likes_: the extension has been toggled to show 'liked' tweets. Click the icon to hide them.

It is possible to hide other kinds of Tweets. To change the kinds of Tweets that are hidden, right-click on the extension icon and select _Options_. A new Chrome tab will open with a list of labeled checkboxes. Check the boxes next to the kinds of tweets you would like to hide: _Likes_, _Follows_, _Retweets_, or _Verified accounts / "Blue Check"_. The click the _Save_ button to apply the changes. It may be necessary to reload Twitter.

## Installation

Easiest option for everyone: Install the extension on Chrome via the Web Store link: 
https://chrome.google.com/webstore/detail/twitter-likes-hider/dkcgnebncpfljfaaplmedjnfjifffagj
 
Or if you are a developer and want to sideload the code: download / clone the source code into a local directory from here: https://github.com/rendall/twitter-like-hider and then follow these instructions from Google to install it on your browser as a developer. https://developer.chrome.com/extensions/getstarted#unpacked

## Privacy Policy

The creator of **Twitter 'Likes' Hider** has zero interest in tracking you. Your privacy is sacrosanct. No data will be kept, tracked, transferred, sold, traded, nor even coveted in any respect, from now until the end of time.

## Support: Have a comment? Question? Feature request?

Please follow this link and fill out the form: https://github.com/rendall/twitter-like-hider/issues/new

## Open Source!

This extension is open source, which means you can see how it works yourself and even contribute to the project.
More details here: https://github.com/rendall/twitter-like-hider

## Change Log

### Update 1.6.3

Twitter changed its code, which caused unwanted tweets to show. This update fixes those.

<details>
<summary>Previous changes</summary>

### New in 1.6.2

Added 'Suggested Topics' to options. Checking 'Topics' will hide Twitter's "suggested topics" sections

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

</details>
