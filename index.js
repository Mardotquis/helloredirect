const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');

const app = require('./app.js');
// Create the server instance using awsServerlessExpress
const server = awsServerlessExpress.createServer(app);

// Define the Lambda handler function
exports.handler = (event, context) => {
  // Proxy the event and context to the server's `proxy` method
  awsServerlessExpress.proxy(server, event, context);    
};

// Run the app locally using nodemon

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

// Export the server for local testing, if needed
module.exports = server;
