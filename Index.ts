const express = require('express');
const app = express();
const router = require('./route.js');
const PORT = 8080;
const HOST = "localhost";

app.use('/org', router.rout);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

module.exports = { app, router };