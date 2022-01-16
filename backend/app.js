const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res, next) => {
  console.log('test');
});

app.listen(port);