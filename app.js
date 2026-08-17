const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

app.use(express.json());

//Stage 1
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data || !data.session) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  const accessToken = data.session.access_token;
  const refreshToken = data.session.refresh_token;

  return res.status(200).json({
    access_token: accessToken,
    refresh_token: refreshToken,
    user: data.user,
  });
});

app.get("/public/info", async (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome stranger! This info is public." });
});
//Stage 2
/*
app.get("/protected/profile", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token required" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  return res.status(200).json({ message: "Token presented successfully" });
});
*/

//Stage 3
/*app.get("/protected/profile", async (req, res) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Access token required" });
  }

  const token = authHeader.split(" ")[1];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
  });
}); */

//Stage 4
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Access token required" });
  }

  const token = authHeader.split(" ")[1];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = user;
  next();
};

app.get("/protected/profile", requireAuth, (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      created_at: req.user.created_at,
    },
  });
});

app.get("/protected/dashboard", requireAuth, async (req, res) => {
  return res.status(200).json({
    message: `Welcome to your dashboard, ${req.user.email}!`,
  })
})

app.post("/auth/logout", requireAuth, async (req, res) => {
  const {error} = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({error: error.message});
  }

  return res.status(204).send();
})
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
