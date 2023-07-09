const app = require('./app'); // Replace with the path to your Express app file
const express = require('express');
const serverless = require('serverless-http');

// Create the Lambda handler function
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  try {
    // You can do other things here

    const result = await handler(event, context);

    // You can do other things here

    return result;
  } catch (error) {
    // Log the error
    console.error('An error occurred:', error);

    // Return an error response if needed
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Oh fuck. Internal Server Error' }),
    };
  }
};
