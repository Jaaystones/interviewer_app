const API_KEY = process.env.GROQ_API_KEY;
const API_URL = process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const API_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

function extractResponseText(data) {
  const choice = data?.choices?.[0];
  return choice?.message?.content || choice?.text || '';
}

function normalizeQuestionList(text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map(String).filter(Boolean);
    }
  } catch {
    // The model may return plain text instead of JSON.
  }

  return text
    .split(/\r?\n/)
    .map(line => line.trim().replace(/^[-\d\.\)]+\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 3);
}

async function generateQuestions(jobTitle) {
  if (!API_KEY) {
    throw new Error('GROQ_API_KEY not set in environment');
  }

  const prompt = [
    'You are an expert technical recruiter.',
    `Given the job title: "${jobTitle}",`,
    'produce exactly 3 thoughtful, role-specific interview questions.',
    'Return only a JSON array of strings with no extra commentary.'
  ].join(' ');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: API_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 256
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const text = extractResponseText(data) || JSON.stringify(data);
  const questions = normalizeQuestionList(text);

  if (questions.length === 3) {
    return questions;
  }

  return [text.substring(0, 800)];
}

module.exports = { generateQuestions };