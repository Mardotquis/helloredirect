const express = require('express');
const serverless = require('serverless-http');

const mainRoutes = require('./app');

const app = express();

app.use(express.json());

app.use('/', mainRoutes);

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(() => {
  const port = process.env.PORT || 3000;
  console.log(`listening at: ${port} hehe`)
}, 3000)

module.exports.handler = serverless(app);