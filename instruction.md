# Interview Question Generator — GitHub Copilot Prompt

## Project Overview

Build a full-stack MVP called **Interview Question Generator**.

### Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Styling: Clean modern CSS
- AI Provider: Google Gemini API
- Deployment-ready for:
  - Frontend → render
  - Backend → Render

---

# Project Goal

Create a simple web application where users enter a job title (example: `"Customer Success Manager"`), click a button, and receive **3 thoughtful interview questions** tailored to that role using an AI API.

---

# Core Requirements

1. Functional end-to-end app
2. Working API integration with Gemini
3. Clean readable UI
4. Loading state while generating questions
5. Proper error handling
6. Secure handling of API keys using environment variables
7. Production-ready folder structure
8. Well-commented code
9. Mobile responsive UI
10. GitHub-ready codebase

---

# Functional Requirements

## Frontend Requirements

Create a clean centered layout containing:

- App title
- Short description
- Text input for job title
- “Generate Questions” button
- Loading spinner/state
- Results section
- Error message section

### Additional Frontend Behaviors

- Prevent empty submissions
- Pressing Enter should submit
- Add subtle animations/transitions
- Responsive on mobile and desktop

---

## Backend Requirements

Create an Express server with:

### API Endpoint

`POST /api/generate`

### Request Body

```json
{
  "jobTitle": "Customer Success Manager"
}