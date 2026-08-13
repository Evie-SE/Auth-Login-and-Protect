# Auth · Login & Protect

A Node.js & Express REST API using **Supabase Auth** for account creation, JWT authentication, and route protection.

## Progress
- **Stage 0:** Initialized Express app, configured environment variables, and connected the Supabase SDK client.
- **Stage 1:** Implemented `POST /auth/signup` (user registration, status 201) and `POST /auth/login` (JWT & refresh token generation, status 200/401).

## Quick Start
1. Install dependencies: `npm install`
2. Configure `.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   PORT=3000
3. Run server: node app.js