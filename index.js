const express = require('express');
const http = require('http');
const enforce = require('express-sslify');
const fs = require('fs');

const key = fs.readFileSync('./config/keys.js');
const cert = fs.readFileSync('./config/keys.js');

const app = express();

const server = http.createServer({ key, cert }, app);

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(express.static('client/build'));

const path = require('path');

app.get('/serviceWorker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'sw.js'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
