
# express-bem-tools-make

[![Build Status](https://travis-ci.org/express-bem/tools-make.svg)](https://travis-ci.org/express-bem/tools-make) [![Dependency Status](https://david-dm.org/express-bem/tools-make.png)](https://david-dm.org/express-bem/tools-make)

[bem-tools][] make middleware (plugin) for [express-bem][]

[bem-tools]: https://github.com/bem/bem-tools
[express-bem]: https://github.com/express-bem/express-bem

Warn: Incompatible with clustering.

## Dependencies

[bem-tools][] v0.9.0+

### Peer

[express-bem][] v0.1.3+

## Why

To make bundles on each render.

Really helpful for bemxjst (bemhtml, bemtree) development purposes.

## Installation

```sh
$ npm i express-bem-tools-make --save
```

## Usage

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

## License

MIT [License][]

[License]: https://github.com/express-bem/express-bem/blob/master/LICENSE
