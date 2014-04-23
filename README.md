component-fbp
==============

Component plugin for requiring [FBP](http://noflojs.org/documentation/fbp/) files

Usage
-----

```js
var fbp = require("component-fbp");

builder.use(fbp());

```

```js
// my-app.js

var graph = require("./mygraph.fbp");

console.log(graph.nodes);
```

```
# mygraph.fbp
'Hello World' -> IN Show(core/Output)
```

Or use directly with `component-build`

```
$ npm install component-fbp
$ component build --use component-fbp
```
