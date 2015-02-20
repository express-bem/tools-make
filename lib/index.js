var PATH = require('path');

var U = require('express-bem/lib/util');

var BEM = require('bem');
var BEMLEVEL = BEM.require('./level');

module.exports = {
    middleware: middleware,
    middlewares: [middleware]
};

function middleware(opts) {
    var that = this; // express-bem

    opts = opts || {};
    opts.env = opts.env || this.env;
    opts.root = opts.root || this.projectRoot;
    opts.verbosity = opts.verbosity || 'error';

    return function (ctx, next) {
        var engine = this.engines.byExtension(this.ext);
        var targets = [];
        var relBundlePath = PATH.relative(opts.root, ctx.name);
        var bundleName = PATH.basename(ctx.name);
        var targetExtensions = (engine.targetExtensions || [engine.extension]);

        if (targetExtensions.length) {
            // build only declared techs/exts
            targetExtensions.forEach(function (ext) {
                targets.push(PATH.join(relBundlePath, bundleName + ext));
            });

        } else {
            // build all bundle techs
            targets.push(relBundlePath);
        }

        bemMake(opts, {targets: targets}, function (err, data) {
            next();
        });
    };
}

var rebuildsInProgress = 0;

/**
 * Calls bem make
 * @param {Object} opts
 * @param {Object} args
 * @param {Function} cb
 */
function bemMake(opts, args, cb) {
    opts.root = opts.root || process.cwd();

    rebuildsInProgress += 1;
    function tryResetLevelsCache() {
        // dirty blocker, see https://ru.bem.info/forum/issues/167/
        rebuildsInProgress -= 1;
        if (rebuildsInProgress) {
            BEMLEVEL.resetLevelsCache();
        }
    }

    BEM.api.make(opts, args)
        .then(function (data) {
            tryResetLevelsCache();
            cb(null, data);
        })
        .fail(function (err) {
            tryResetLevelsCache();
            cb(err);
        })
        .done();
}
