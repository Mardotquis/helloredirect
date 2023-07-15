const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const port = 3000;
const time = new Date();

// Configure AWS SDK	
AWS.config.update({ region: 'us-east-1' });

const dynamoDb = new DynamoDB({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT  
});

const TableName = 'TemporaryUrls';

app.get('/health', async (req, res) => {
  try {
    res.json({ healthy: true, date: time) });
  } catch (error) {
    res.status(500).json({ error: 'error hitting api' });
	  }
});

app.get('/gen', (req, res) => {
  const { url } = req.query;

  const id = uuid().substring(0, 3);

  const params = {
    TableName,
    Item: {
      id,
      url,
    },
  };

  dynamoDb.putItem(params, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating short link');
    }

    return res.send({ id });
  });
});

app.get('/get/:id', (req, res) => {
  const { id } = req.params;

  const params = {
    TableName,
    Key: {
      id,
    },
  };

  dynamoDb.getItem(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving link');
    }

    if (!data.Item) {
      return res.status(404).send('Short link not found');
    }

    const { url } = data.Item;
    return res.redirect(url);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

