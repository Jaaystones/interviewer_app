# Server

This folder contains the Express API that generates interview questions.

What it does

- Accepts a job title in `POST /api/generate`
- Sends the prompt to Groq
- Returns 3 interview questions as JSON

Setup

```bash
cd server
pnpm install
cp .env.example .env
```

Add your API key to `.env`:

```bash
GROQ_API_KEY=your_key_here
PORT=4000
```

Run the server

```bash
pnpm dev
```

Useful scripts

- `pnpm dev` starts the server with nodemon
- `pnpm start` starts the server once
- `pnpm test:e2e` runs the local API test
