const express = require('express');
const path = require('path');
const app = express();
const redis = require('redis');
const port = 3000;
const redisPort = 6379;

const client = redis.createClient(redisPort);

client.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Could not connect to Redis:', err);
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/war/orders', async (req, res) => {
  try {
    const cachedData = await client.get('orders');

    if (cachedData) {
      console.log('Serving cached data orders');
      return res.json(JSON.parse(cachedData));
    }

    const response = await fetch("https://helldiverstrainingmanual.com/api/v1/war/major-orders");

    if (!response.ok) {
        throw new Error("ERROR: COULD NOT FETCH API");
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        await client.setEx("orders", 3600, JSON.stringify(data));
        res.json(data);
    } else {
        const text = await response.text();
        throw new TypeError('Expected JSON, but got: ' + text);
    }

} catch (error) {
    console.error("COULD NOT FETCH DATA FROM API: ", error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

app.get('/war/planets', async (req, res) => {
  try {
    const cachedData = await client.get('planets');

    if (cachedData) {
      console.log('Serving cached data from planets');
      return res.json(JSON.parse(cachedData));
    }

    const response = await fetch("https://helldiverstrainingmanual.com/api/v1/war/campaign");
    if (!response.ok) {
      throw new Error("ERROR: COULD NOT FETCH API");
    }
    const data = await response.json();
    await client.setEx("planets", 3600, JSON.stringify(data));
    res.json(data);
}
catch(error) {
  console.log("COULD NOT FETCH DATA FROM API");
  res.status(500).json({error: 'Failed to fetch data'});
}
})

app.get('/war/superstore', async (req, res) => {
  try {
    const cachedData = await client.get('superstore');

    if(cachedData) {
      console.log('Serving cached data from superstore');
      return res.json(JSON.parse(cachedData));
    }

    const response = await fetch("https://api.diveharder.com/v1/store_rotation");
    if (!response.ok) {
      throw new Error("ERROR: COULD NOT FETCH API");
    }
    const data = await response.json();
    await client.setEx("superstore", 3600, JSON.stringify(data));
    res.json(data);
} 
  catch(error) {
    console.log("COULD NOT FETCH DATA FROM API");
    res.status(500).json({error: 'Failed to fetch data'});
  }
})

app.get('*', (req, res) => {
  console.log(req.url)
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});