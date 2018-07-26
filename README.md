# ios-inner-height
> Retrieve a consistent, accurate `window.innerHeight` measurement from iOS

iOS Safari has a neat feature that results in `window.innerHeight` providing different values based on whether or not the URL control and menu bar are expanded.
This is the case when a page initially loads - or if the page content is shorter than the screen.
As a user scrolls, the menu bar retracts beneath the perceivable screen and the URL control shrinks to increase the amount of the page now visible to the user.

For a better explanation, read ["The iOS Safari menu bar is hostile to web apps: discuss"](https://benfrain.com/the-ios-safari-menu-bar-is-hostile-to-web-apps-discuss/).

This can get super annoying super quick when one wants to know the scrolled viewport height sans expanded URL and menu bar for, say, measuring an element's percentage in view.
It seems the most reliable way to determine the window's inner height regardless of Safari's current scroll state is to inject an element into the DOM, set its height to `100vh`, measure it, and destroy it.

This module provides a consistent pixel measurement for the state of iOS Safari having no menu bar and a collapsed URL control, independent of its actual state.


## Example output
From an iOS device, load the example page.
This page reports the current height returned by this module and by calling `window.innerHeight`.

| reporter             | page load   | after scroll | orientation change   |
|----------------------|-------------|--------------|----------------------|
| `ios-inner-height`   | `628px`     | `628px`      | `375px`              |
| `window.innerHeight` | `559px`     | `628px`      | `375px <= => 331px`  |


![alt text](https://kettle-modules.s3.amazonaws.com/ios-inner-height/ios-1.png)
![alt text](https://kettle-modules.s3.amazonaws.com/ios-inner-height/ios-2.png)

*Measurements upon initial load and after scroll.*

![alt text](https://kettle-modules.s3.amazonaws.com/ios-inner-height/ios-3.png)
![alt text](https://kettle-modules.s3.amazonaws.com/ios-inner-height/ios-4.png)

*Measurements upon initial load and after scroll (landscape).*


## Installation
Install via npm:

```sh
$ npm i -S ios-inner-height
```


## Usage as a module
The module exposes a getter that can be called as often as you like.
It will automatically account for the window's current orientation.
And all measurements are done upon instantiation, so future calls should introduce zero DOM overhead.

```javascript
var innerHeight = require('ios-inner-height');

// now anytime you need it, get a reliable window height
console.log(innerHeight());
```


## Built file usage
A built file and its minififed version are included in the `dist` folder.
This is a standard [`browserify`](https://github.com/browserify/browserify) standalone file.
This file will work with other module systems and sets `iosInnerHeight` as a global method if no module system is found. 

```html
<!doctype html>
<html>
<head>
  <title>iOS Inner Height</title>
</head>
<body>
  <p>iosInnerHeight measurement: <span id="measurement"></span></p>
  <script src="some-path/ios-inner-height.js"></script>
  <script>
    var el = document.getElementById('measurement');
    setInterval(function () {
      el.textContent = iosInnerHeight() + 'px';
    }, 100);
  </script>
</body>
</html>
```


## Known issues
Tests are pretty horrible.
Searching for a headless version of iOS Safari.


## Resources
- The Safari team's [perspective](https://bugs.webkit.org/show_bug.cgi?id=141832).
- Article ["The iOS Safari menu bar is hostile to web apps: discuss"](https://benfrain.com/the-ios-safari-menu-bar-is-hostile-to-web-apps-discuss/)
- Busting `require`'s cache for testing with [proxyquire](https://github.com/thlorenz/proxyquire)
