'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '64kb' }));

// Health check for Render (This fixes the "Awaiting" status)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Strict v1 Encoder Endpoint
app.post('/v1/encode', (req, res) => {
  const { input } = req.body;

  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Input must be a string.' });
  }

  try {
    const output = Buffer.from(input).toString('base64');
    res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({ error: 'Encoding failed.' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Encoder running on port ${PORT}`);
});
