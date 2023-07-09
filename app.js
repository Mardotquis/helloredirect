const AWS = require('aws-sdk');
const express = require('express');
const app = express.Router();
const port = 3000;
const time = new Date();

// Configure AWS SDK	
AWS.config.update({ region: 'us-east-1' });

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Endpoint to retrieve text entries
app.get('/get', async (req, res) => {
  try {
    const result = await dynamodb.scan({ TableName: 'TemporaryUrls' }).promise();
    const textEntries = result.Items.map((item) => item.textEntry);
    res.json({ entries: textEntries });
  } catch (error) {
    console.error('Error retrieving text entries from DynamoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
	  }
});

// Endpoint to retrieve text entries
app.get('/health', async (req, res) => {
  try {
    res.json({ healthy: true, time });
  } catch (error) {
    res.status(500).json({ error: 'error hitting api' });
	  }
});


// Endpoint to set new text entries
app.post('/set', async (req, res) => {
  const { textEntry } = req.body;

  // Generate a unique identifier
  const uniqueId = generateUniqueId();

  // Save the text entry in DynamoDB
  const params = {
    TableName: 'TemporaryUrls',
    Item: {
      id: uniqueId,
      textEntry: textEntry,
    },
  };

  try {
    await dynamodb.put(params).promise();
    res.status(201).json({ message: 'Text entry saved successfully' });
  } catch (error) {
    console.error('Error saving text entry to DynamoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;