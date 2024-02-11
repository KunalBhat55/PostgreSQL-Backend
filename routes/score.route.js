import { Router } from "express";
import { dbClient } from "../db/db.js";


const router = Router();


router.get("/", async (req, res) => {

  res.json({message: "Hello From Express"})


});
router.post("/calculate", async (req, res) => {

  const {capital} = req.body;
  // db score++
  let score = 0;
  console.log(capital);

  const capitals = await dbClient.query(`SELECT capital FROM capitals`)
  
  for(let i = 0; i < capitals.rows.length; i++){

    if(capitals.rows[i] === capital.toLowerCase()){
      
        score++;
        break;
    
    }

  }

 return res.status(200).json({score});


})

export default router;