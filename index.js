const sHandler = require('serverless-express/handler')
const express = require('express');

const app = require('./app.js');


// Define the Lambda handler function
exports.sHandler = handler(app);

// Run the app locally using nodemon
if (require.main === module) {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Export the server for local testing, if needed
module.exports = server;
