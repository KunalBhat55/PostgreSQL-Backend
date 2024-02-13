import express from "express";
import { dbClient } from "./db/db.js";
import { userTable } from "./tables/user.table.js";
import userRoute from "./routes/user.route.js";
import scoreRoute from "./routes/score.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/score", scoreRoute);
app.use("/api/user", userRoute);

dbClient
  .connect()
  .then(() => userTable()) // create user table
  .then(() =>
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    })
  )
  .catch((err) => console.log(err));

