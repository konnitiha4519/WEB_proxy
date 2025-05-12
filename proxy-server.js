const express = require('express');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('url parameter is required');

  request(targetUrl)
    .on('error', (err) => res.status(500).send(err.toString()))
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
