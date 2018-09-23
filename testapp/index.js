const express = require('express');
const app = express();

app.get('/', require('./lib/root.js'));

app.get('/:name', require('./lib/name.js'));

app.listen(3000, () => {
  console.log('server listening on http://localhost:3000/');
});
