import express from "express";
import { dbClient } from "./db/db.js";
import { userTable } from "./tables/user.table.js";
import userRoute from "./routes/user.route.js";
import scoreRoute from "./routes/score.route.js";
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/score", scoreRoute); 
app.use("/api/user", userRoute); 

dbClient
  .connect()
  .then(() => {
    console.log("Connected to database");
    userTable();
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.listen(3000, () => {
  console.log("Server started on port 3000"); 
});
  

