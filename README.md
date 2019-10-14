# broken ssr with untranspiled files

The @samknows/utils dependency (in this case, built from the `minimal-utils` directory) contains an untranspiled Vue file which is being imported in App.vue.

The rest of the project is a fairly standard vue-cli 3 project with SSR.

To build the project and start the server, run `npm run build`.

When you navigate to http://localhost:8080, it works in the browser, but errors on the server. I don't understand why it would work in one place but not the other!
