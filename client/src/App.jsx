import React, { useState } from 'react'

const COPY = {
  title: 'Interview Question Generator',
  label: 'Job title',
  placeholder: 'Customer Success Manager',
  exampleButton: 'Use example',
  mainButton: 'Make questions',
  loading: 'Making questions',
  loadingPrefix: 'Making questions for',
  errorTitle: 'Something went wrong',
  resultsTitle: 'Your questions',
  resultsTag: '3 questions',
  introLabel: 'Quick interview help',
  introHeading: 'Get 3 interview questions for any job title.',
  introBody:
    'Type a job title and get three simple interview questions you can use right away. Start with Customer Success Manager or your own role.',
  examplePills: ['Quick', 'Simple', '3 questions']
}

export default function App() {
  const [jobTitle, setJobTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')

  const apiRoot = import.meta.env.VITE_API_URL || ''
  const canSubmit = jobTitle.trim().length > 0 && !loading

  async function handleSubmit(e) {
    e?.preventDefault()
    setError('')
    setQuestions([])
    const title = jobTitle.trim()
    if (!title) return setError('Please enter a job title')
    setLoading(true)
    try {
      const res = await fetch(`${apiRoot}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle: title })
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setQuestions(data.questions || [])
    } catch (err) {
      setError(err.message || 'Failed to generate questions')
    } finally {
      setLoading(false)
    }
  }

  function useExampleTitle() {
    setJobTitle(COPY.placeholder)
  }

  return (
    <div className="page-shell">
      <main className="app-card">
        <section className="hero">
          <div className="eyebrow">{COPY.introLabel}</div>
          <h1>{COPY.introHeading}</h1>
          <p>{COPY.introBody}</p>
          <div className="hero-pills" aria-hidden>
            {COPY.examplePills.map(pill => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </section>

        <section className="generator-panel">
          <form onSubmit={handleSubmit} className="form">
            <label className="field-label" htmlFor="jobTitle">{COPY.label}</label>
            <div className="input-row">
              <input
                id="jobTitle"
                aria-label="job title"
                placeholder={COPY.placeholder}
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
              <button type="button" className="ghost-button" onClick={useExampleTitle}>
                {COPY.exampleButton}
              </button>
            </div>
            <button type="submit" className="primary-button" disabled={!canSubmit}>
              {loading ? (
                <span className="button-loading">
                  <span className="button-spinner" aria-hidden />
                  {COPY.loading}
                </span>
              ) : (
                COPY.mainButton
              )}
            </button>
          </form>

          {loading && (
            <div className="loading-card" aria-live="polite">
              <div className="loading-bar" />
              <div className="loading-copy">
                {COPY.loadingPrefix} <strong>{jobTitle.trim() || 'your role'}</strong>...
              </div>
            </div>
          )}

          {error && (
            <div className="error-banner" role="alert">
              <strong>{COPY.errorTitle}</strong>
              <span>{error}</span>
            </div>
          )}

          {questions && questions.length > 0 && (
            <section className="results-card">
              <div className="results-header">
                <div>
                  <div className="section-kicker">Generated output</div>
                  <h2>{COPY.resultsTitle}</h2>
                </div>
                <div className="results-badge">{COPY.resultsTag}</div>
              </div>

              <ol className="question-list">
                {questions.map((q, i) => (
                  <li key={i} className="question-item">
                    <span className="question-index">0{i + 1}</span>
                    <p>{q}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </section>
      </main>
    </div>
  )
}
