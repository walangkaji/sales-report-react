const argv = require('yargs').argv
const debug = require('debug')('app:karma')
const fs = require('fs')
const config = require('../config')
const webpackConfig = require('./webpack.config')

const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'))
babelConfig.presets[0].plugins.push('istanbul')

debug('Creating configuration.')
const karmaConfig = {
  basePath : '../', // project root in relation to bin/karma.js
  files    : [
    {
      pattern  : `./${config.dir_test}/test-bundler.js`,
      watched  : false,
      served   : true,
      included : true,
    },
  ],
  singleRun     : !argv.watch,
  frameworks    : ['mocha'],
  reporters     : ['mocha'],
  preprocessors : {
    [`${config.dir_test}/test-bundler.js`] : ['webpack'],
  },
  browsers : ['PhantomJS'],
  webpack  : {
    devtool : 'cheap-module-source-map',
    resolve : Object.assign({}, webpackConfig.resolve, {
      alias : Object.assign({}, webpackConfig.resolve.alias, {
        sinon : 'sinon/pkg/sinon.js',
      }),
    }),
    plugins : webpackConfig.plugins,
    module  : {
      noParse : [
        /\/sinon\.js/,
      ],
      loaders : webpackConfig.module.loaders.concat([
        {
          test   : /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader : 'imports?define=>false,require=>false',
        },
      ]),
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals : Object.assign({}, webpackConfig.externals, {
      'react/addons'                   : true,
      'react/lib/ExecutionEnvironment' : true,
      'react/lib/ReactContext'         : 'window',
    }),
    sassLoader : webpackConfig.sassLoader,
  },
  webpackMiddleware : {
    noInfo : true,
  },
  coverageReporter : {
    reporters : config.coverage_reporters,
  },
}

if (config.globals.__COVERAGE__) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test    : /\.(js|jsx)$/,
    include : new RegExp(config.dir_client),
    exclude : /node_modules/,
    loader  : 'babel',
    query   : babelConfig,
  }]
}

module.exports = cfg => cfg.set(karmaConfig)
