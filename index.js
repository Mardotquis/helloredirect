const app = require('./app'); // Replace with the path to your Express app file
const express = require('express');

// Define your routes and middleware
app.get('/', (req, res) => {
  res.send('Hello, q world!');
});

// Export the handler function
module.exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    // Run the Express application
    app(event, context, (error) => {
      if (error) {
        console.log('error occ::', error)
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
