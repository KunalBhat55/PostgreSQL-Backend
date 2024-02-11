import { Router } from "express";
import { dbClient } from "../db/db.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username and password are Required!" });
  }

  const user = await dbClient.query(
    // prevents SQL injection and adds a layer of security
    `SELECT * FROM users WHERE username = $1 and password = $2`,
    [username, password]
  );

  if (user.rows.length === 0) {
    return res.status(404).json({ message: "User not found!" });
  }

  return res.status(200).json({ message: "logged in Successfully!" });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Usernname and password are Required!" });
  }

  const findUser = await dbClient.query(
    // prevents SQL injection and adds a layer of security
    `SELECT * FROM users WHERE username = $1 and password = $2`,
    [username, password]
  );

  if (findUser.rows.length !== 0) {
    return res.status(404).json({ message: "Already Register Login!" });
  }

  const insertQuery = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const values = [username, password];

  const user = await dbClient.query(insertQuery, values);

  return res.status(200).json({ message: "Registered successfully" });
});

router.get("/secrets", authMiddleware, async (req, res) => {
  return res
    .status(200)
    .json({ message: "You have discovered the Secret, Congratulations!" });
});

router.get("/getUsers", async (req, res) => {
  const getUsers = `SELECT * FROM users`;

  const users = await dbClient.query(getUsers)
  const result = users.rows;

  res.status(200).json({result})
});

export default router;
