const webpack = require('webpack');
const { JavascriptWebpackConfig, CssWebpackConfig } = require('@silverstripe/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');

const PATHS = {
    MODULES: 'node_modules',
    THIRDPARTY: '../../thirdparty',
    ROOT: Path.resolve(),
    SRC: Path.resolve('client/src'),
    DIST: Path.resolve('client/dist'),
    LEGACY_SRC: Path.resolve('client/src/legacy'),
};

const config = [
    // Main JS bundles
    new JavascriptWebpackConfig('js', PATHS, 'silverstripers/seo')
        .setEntry({
            bundle: `${PATHS.SRC}/bundles/bundle.js`,
        })
        .getConfig(),
    // sass to css
    new CssWebpackConfig('css', PATHS)
        .setEntry({
            bundle: `${PATHS.SRC}/styles/bundle.scss`,
        })
        .getConfig(),
];

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
module.exports = (process.env.WEBPACK_CHILD)
    ? config.find((entry) => entry.name === process.env.WEBPACK_CHILD)
    : config;
