import { Router } from "express";
import { dbClient } from "../db/db.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json({ message: "Hello From Express" });
});

let score = 0;

router.post("/calculate", async (req, res) => {
  const { capital } = req.body;

  let capitals = [];

  const results = await dbClient.query(`SELECT capital FROM capitals WHERE capital IS NOT NULL`);

  capitals = results.rows;

  for (let i = 0; i < capitals.length; i++) {
    if (capitals[i].capital.toLowerCase() === capital.toLowerCase()) {
      score++;
      console.log(capitals[i]);
      break;
    }
  }

  return res.status(200).json({ score });
});

export default router;
