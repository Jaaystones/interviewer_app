# Client

This folder contains the web page people use to generate interview questions.

What it does

- Lets a user type a job title
- Sends that job title to the server
- Shows 3 generated interview questions on screen

Setup

```bash
cd client
pnpm install
cp .env.example .env
```

Set the server URL in `.env`:

```bash
VITE_API_URL=http://localhost:4000
```

Run the client

```bash
pnpm dev
```

Useful scripts

- `pnpm dev` starts the local website
- `pnpm build` creates a production-ready build
- `pnpm preview` previews the production build locally
