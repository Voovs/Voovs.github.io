# Vue without Webpack
Deviating from the standard, since webpack is overkill most of the time, this site is using Vue with plain html. Surprisingly, there are few online examples for how to achieve this on a large scale. I hope this repository will clear up the confusion for anyone else reluctant to use webpack

### Coming soon
- A word counter, pulling on my previous work at [NestedNotes](https://nestednotes.netlify.com/#/wc)
- Essentially a virtural closet. Will need Firebase's Firestore and authentication set up for this to run. Ideally, it'll be a styled file tree to access your outfits digitally. Should have support for uploading user images, yet some serious size restrictions will be enabled. A very intuite search option will be provided, so you can find you outfits through several categories: personal naming, fabric type, colors, season, and user rating
- The typing speed test. Only one has so far satisfied me, [created by Ching Chang](https://chingchang.dev/projects/typing-speed-test). While his is certainly capable, I'd like to add some competition to the market, while addressing some issues with Mr. Chang's typing speed test
- A showcase of generative art. Sort of like a museum. Should explain what generative art is, some historical context, provide real world examples, and allow users to get their hands messy in a few quick generative art creation demos
- The best page anyone has ever seen

### Major bugs and issues
- Firebase wants to load index.html from /public, which wouldn't work very well for voovs.github.io. Something needs to be resolved
- History mode simply breaks the site. Fix firebase from above to begin this issue
- Animation of theme button, on home page, fails to transition. May be a sizing error
- Color-schemer takes too long to hide side arrows. Users entering this page will see the arrows for about half a second, until they spontaneously disappear

### Already finished!
- Some sort of really simple, yet effective colour scheme creator. All the ones online have too many ads, are unnecessarily complex, or don't have enough functionality
