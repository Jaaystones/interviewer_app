// Simple sanity test for generateQuestions()
process.env.GROQ_API_KEY = 'test-key'

// Mock global.fetch to simulate an OpenAI-style (Grok) response
global.fetch = async function () {
  return {
    ok: true,
    json: async () => ({
      choices: [
        {
          message: {
            content: '["What experience do you have with customer success tools?","Describe a time you handled a difficult customer and the outcome.","How do you measure and drive customer retention?"]'
          }
        }
      ]
    })
  }
}

const { generateQuestions } = require('../aiClient')

;(async () => {
  try {
    const qs = await generateQuestions('Customer Success Manager')
    console.log('Sanity test output:', qs)
    if (!Array.isArray(qs) || qs.length !== 3) {
      console.error('Sanity test failed: expected 3 questions')
      process.exit(1)
    }
    console.log('Sanity test passed')
    process.exit(0)
  } catch (err) {
    console.error('Sanity test error:', err)
    process.exit(2)
  }
})()
