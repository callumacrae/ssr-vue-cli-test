const path = require('path');
const { readFileSync } = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

const template = readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const app = express();

app.use(
  '/',
  express.static(path.resolve(__dirname, '../dist/'), {
    index: false
  })
);

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template.replace(/<div id="?app"?><\/div>/, '<!--vue-ssr-outlet-->')
});

app.get('*', (req, res) => {
  if (!res.headersSent) {
    res.setHeader('Content-Type', 'text/html');
  }

  const context = {
    url: req.url
  };

  renderer.renderToString(context, (err, generated) => {
    if (err) {
      console.error('SSR error:', err);
      res.send(template);
      return;
    }

    res.send(generated);
  });
});

const port = parseInt(process.env.NODE_PORT, 10) || 8080;
app.listen(port, () => {
  console.info('Server is running at http://localhost:' + port + '/');
});
