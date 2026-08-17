# Auth · Login & Protect

A secure Node.js & Express REST API using **Supabase Auth** for account management, JWT authentication, and protected routes guarded by middleware.

---

## 🚀 Progress So Far

### Stage 0: Setup & Infrastructure
- [x] Initialized Node.js environment with Express framework.
- [x] Configured `.env` secrets (`SUPABASE_URL`, `SUPABASE_KEY`) and added `.gitignore`.
- [x] Connected to Supabase Auth client using `@supabase/supabase-js`.

### Stage 1: Open Auth — Sign Up & Log In
- [x] **`POST /auth/signup`**: Registers users via Supabase (`201 Created` on success, `400` on missing fields).
- [x] **`POST /auth/login`**: Authenticates users and returns JWT access & refresh tokens (`200 OK` on success, `401` on invalid credentials).

### Stage 2 & 3: Public Gates & Token Verification
- [x] **`GET /public/info`**: Public endpoint returning `200 OK` without authentication.
- [x] **`GET /protected/profile`**: Token verification using `supabase.auth.getUser(token)`. Returns `401 Unauthorized` if token is missing, expired, or tampered with.

### Stage 4: Middleware Protection (In Progress)
- [x] **Reusablve Auth Middleware (`requireAuth`)**: Extracted token verification logic into a standalone Express middleware that attaches `req.user`.
- [x] **Applied Guard to Protected Routes**: Protected both `GET /protected/profile` and a secondary `GET /protected/dashboard` route using the `requireAuth` middleware.
- [ ] **`POST /auth/logout`**: *Up next!*

---

## 🛠️ Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
SUPABASE_KEY=your-supabase-anon-key
PORT=3000