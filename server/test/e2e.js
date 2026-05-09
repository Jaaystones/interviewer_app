// E2E test: start app with a mocked AI adapter and POST to /api/generate
process.env.GROQ_API_KEY = 'test-key'

// Patch the AI client before requiring the app so the server uses the mock
const aiClient = require('../aiClient')
aiClient.generateQuestions = async function (jobTitle) {
  return [
    `What experience do you have that makes you a strong ${jobTitle}?`,
    'Describe a time you managed a difficult customer situation.',
    'How do you measure success in your role?'
  ]
}

const app = require('../index')

async function run() {
  const server = app.listen(0, async () => {
    const port = server.address().port
    const url = `http://127.0.0.1:${port}/api/generate`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle: 'Customer Success Manager' })
      })
      const data = await res.json()
      console.log('E2E response:', data)
      if (!data.questions || data.questions.length !== 3) {
        console.error('E2E test failed: expected 3 questions')
        server.close(() => process.exit(1))
      } else {
        console.log('E2E test passed')
        server.close(() => process.exit(0))
      }
    } catch (err) {
      console.error('E2E test error:', err)
      server.close(() => process.exit(2))
    }
  })
}

run()
