# broken ssr with untranspiled files

The @samknows/utils dependency (in this case, built from the `minimal-utils` directory) contains an untranspiled Vue file which is being imported in App.vue.

The rest of the project is a fairly standard vue-cli 3 project with SSR.

To build the project and start the server, run `npm run build`.

When you navigate to http://localhost:8080, it works in the browser, but errors on the server.

The error I get on the server:

```
SSR error: /Users/callumacrae/Sites/samknows/ssr-vue-cli-test/node_modules/@samknows/utils/Test.vue:1
(function (exports, require, module, __filename, __dirname) { <template>
                                                              ^

SyntaxError: Unexpected token <
    at new Script (vm.js:79:7)
    at createScript (vm.js:251:10)
    at Object.runInThisContext (vm.js:303:10)
    at Module._compile (internal/modules/cjs/loader.js:656:28)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
    at Module.load (internal/modules/cjs/loader.js:598:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
    at Function.Module._load (internal/modules/cjs/loader.js:529:3)
    at Module.require (internal/modules/cjs/loader.js:636:17)
    at require (internal/modules/cjs/helpers.js:20:18)
```

It looks like vue-loader isn't transpiling the file because it is coming from node_modules. I don't understand why it would transpile in the browser but not on the server!
