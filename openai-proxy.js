const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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'; // <-- Replace with your real OpenAI API key

app.post('/api/openai', async (req, res) => {
  console.log('Received request:', JSON.stringify(req.body)); // Log incoming request
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    console.log('OpenAI response:', JSON.stringify(data)); // Log OpenAI response
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err); // Log proxy error
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`OpenAI proxy running on port ${PORT}`)); 
