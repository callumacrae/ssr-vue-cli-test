const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  configureWebpack: {
    entry: `./src/${TARGET_NODE ? 'entry-server' : 'main'}`,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    devtool:
      NODE_ENV === 'development'
        ? 'cheap-module-eval-source-map'
        : 'source-map',
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ],
    externals: TARGET_NODE
      ? nodeExternals({
          whitelist: [/\.css$/, /@samknows\/generic/]
        })
      : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // use development mode on stage
    mode: NODE_ENV === 'production' ? 'production' : 'development',
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined,
      minimize: ['production', 'stage'].includes(NODE_ENV)
    },
    resolve: {
      alias: {
        '@/': path.resolve(process.cwd(), 'src')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          optimizeSSR: false,
          compilerOptions: {
            preserveWhitespace: true
          }
        })
      );
  }
};
