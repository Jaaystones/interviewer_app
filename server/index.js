require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateQuestions } = require('./aiClient');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { jobTitle } = req.body || {};
    if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.trim() === '') {
      return res.status(400).json({ error: 'Missing or invalid `jobTitle` in request body' });
    }

    const questions = await generateQuestions(jobTitle.trim());
    return res.json({ questions });
  } catch (err) {
    console.error('Error in /api/generate', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
