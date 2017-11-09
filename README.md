<!-- REPO BADGES -->
<p align="center">
  <!-- Travis Build Status -->
  <a href="https://travis-ci.org/Tahseenm/youreadydom">
    <img
      height="25"
      src="https://img.shields.io/travis/Tahseenm/youreadydom.svg?style=flat-square"
      alt="Travis Build">
  </a>

  <!-- Code coverage report -->
  <a href="https://codecov.io/github/Tahseenm/youreadydom">
    <img
      height="25"
      src="https://img.shields.io/codecov/c/github/Tahseenm/youreadydom.svg?style=flat-square"
      alt="Codecov Coverage" >
  </a>

  <!-- NPM version -->
  <a href="http://npm.im/youreadydom">
    <img 
      height="25"
      src="https://img.shields.io/npm/v/youreadydom.svg?style=flat-square"
      alt="Version" >
  </a>

  <!-- LICENSE -->
  <a href="http://opensource.org/licenses/MIT">
    <img
      height="25"
      src="https://img.shields.io/npm/l/youreadydom.svg?style=flat-square"
      alt="MIT License">
  </a>
</p><!-- ./REPO BADGES -->



<!-- BANNER -->
<p align="center">
  <img
    width="100%"
    src="https://s1.postimg.org/7px6wqy8xb/you_ready_DOM.jpg"
    alt="you ready DOM" >
</p>

<h1 align="center">
  <img
    width="300"
    src="https://media.giphy.com/media/143iztTn6RI2eA/giphy.gif"
    alt="dogs waiting" >
</h1>
<p align="center">
  <b>Hold off that javascript code until Document Object Model (DOM) is <i>safe</i>
  to manipulate.</b>
</p>
<!-- ./BANNER -->

<p>&nbsp;</p><!-- Spacing -->



## Table of Content
- [Library](#library)
- [Browser Support](#browser-support)
- [Installation](#installation)
- [Examples](#examples)
  - [Callback](#callback)
  - [Promise](#promise)
  - [Async Function](#async-function)
- [Contributors](#contributors)
- [License](#license)


## Library
`youreadydom` is a **tiny**, fully [tested](https://codecov.io/github/Tahseenm/youreadydom) javascript library, written in ES6. It provides the same functionality as jQuery [`.ready()`](https://api.jquery.com/ready/) method without jQuery's overhead. Unlike jQuery, `youreadydom` is **promise based**—it's modern 😎. Check out the [examples below](#examples).

You can add this to your list of reasons for [why you might not need jquery](https://css-tricks.com/now-ever-might-not-need-jquery/) anymore.

For those unfamiliar with jQuery [`.ready()`](https://api.jquery.com/ready/) method, it provides a way to run javascript code as soon as the Document Object Model (DOM) has finished loading.

#### `'DOMContentLoaded'`
[Most browsers]((https://caniuse.com/#search=DOMContentLoaded)) provide the 'DOMContentLoaded' event which provides similar functionality but differs in that it does not execute any listener which is added after the event is fired. Internally this library adds a **single** 'DOMContentLoaded' event listener **only** if DOM content has not already loaded. The listener is removed once the event is fired and all handlers are executed in the order they are added.

```javascript
/** Comparison */
setTimeout(() => {
  document.addEventListener('DOMContentLoaded', () => {
    /** 'DOMContentLoaded' event has already fired so code doesn't run */
    alert('I will not run 😩')
  })

  domReady(() => {
    /** youreadydom works */
    alert('I will run 😊')
  })
}, 0)
```

#### `window.onload`
The 'load' event on `window` is fired when all resources on the page have finished loading. This includes images.

<p>&nbsp;</p><!-- Spacing -->


## Browser Support
| Chrome | Safari | IE* / Edge | Firefox | Opera |
| ------ | ------ | ---------- | ------- | ----- |
| Yes    | Yes    | 9+         | Yes     | Yes   |

_Note: Internet Explorer is supported as long as Promise is polyfilled. Check
out [polyfill.io](https://polyfill.io/) for automatic browser polyfills!_

<p>&nbsp;</p><!-- Spacing -->


## Installation
This module is distributed via [npm](https://www.npmjs.com/) which is bundled
with [node](https://nodejs.org/en/) and should be installed as one of your
project's `dependencies`

Using [npm](https://www.npmjs.com/)
```bash
> npm install --save youreadydom
```

Using [yarn](https://yarnpkg.com/en/)
```bash
> yarn add youreadydom
```

Using CDN _(Not recommended)_
```html
<!-- Exposes `domReady` global function -->
<script src="https://unpkg.com/youreadydom@1.0.0/dist/youreadydom.min.js"></script>
```

<p>&nbsp;</p><!-- Spacing -->


## Examples
### Callback
Lib example using Javascript callbacks
```javascript
'use strict'

var domReady = require('youreadydom')
var $ = document.querySelector.bind(document)


/** Oldschool 👍 */
domReady(function something() {
  var foo = $('#foo')
  var bar = $('#bar')

  /** Do something ... */
})
```

### Promise
Lib example using Javascript Promises
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import whenDOMisReady from 'youreadydom'

import $ from './dom'
import App from './App'


const renderApp = () => ReactDOM.render(<App />, $('#root'))

/** Enjoy a promise 😃 */
whenDOMisReady().then(renderApp)
```

### Async Function
Lib example using Javascript async functions
```javascript
import domToBeReady from 'youreadydom'

import $ from './dom'
import fetchFoo from './foo.service'


/** Just `await` it 😍 */
;(async function main() {
  const data = await fetchFoo()

  await domToBeReady()

  const foo = $('#foo')
  foo.textContent = data
})()
```

<p>&nbsp;</p><!-- Spacing -->


## Contributors
[Tahseen Malik](https://tahseenmalik.com)


## License
MIT
