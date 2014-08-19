
# bem-tools make middleware for [express-bem][] [![Build Status](https://travis-ci.org/zxqfox/express-bem-tools-make.svg)](https://travis-ci.org/zxqfox/express-bem-tools-make) [![GitHub Release](http://img.shields.io/github/release/zxqfox/express-bem-tools-make.svg)](https://github.com/zxqfox/express-bem-tools-make/releases) [![Dependency Status](https://david-dm.org/zxqfox/express-bem.png)](https://david-dm.org/zxqfox/express-bem-tools-make)

[express-bem]: https://github.com/zxqfox/express-bem

## Dependencies

### Peer

[express-bem][] v0.1.3+

Why
---

To make bundles on each render.

Really helpful for bemxjst (bemhtml, bemtree) development purposes.

Installation
------------

```sh
$ npm i express-bem-tools-make --save
```

Usage
-----

```js
var
  Express = require('express'),
  ExpressBem = require('express-bem'),

  app = Express(),
  bem = ExpressBem({projectRoot: './path-to/bem-project'});

bem.bindTo(app);

if (process.env.NODE_ENV === 'development') {
  bem.use(require('express-bem-tools-make').middleware, {verbosity: 'debug'});
  // bem.usePlugin('tools-make', {verbosity: 'debug'});
}
```

License
-------

MIT [License][]

[License]: https://github.com/zxqfox/express-bem/blob/master/LICENSE
