const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/v1/encode', (req, res) => {
  const { text } = req.body;
  if (!text && text !== "") return res.status(400).json({ error: "Missing text" });
  const result = Buffer.from(text).toString('base64');
  res.json({ result });
});

app.listen(process.env.PORT || 3000);
