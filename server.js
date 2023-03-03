const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8088;

app.use(express.static(path.join(__dirname, '/www/')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);