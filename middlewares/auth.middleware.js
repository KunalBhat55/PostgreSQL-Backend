import { dbClient } from "../db/db.js";

const authMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "No username or password found for Authentication" });
  }
  
  const findQuery = `SELECT * FROM users WHERE username = $1 and password = $2`;
  const values = [username, password];

  const user = await dbClient.query(findQuery, values);
  console.log(user.rows)
  if(user.rows.length === 0){

    return res
    .status(409)
    .json({ message: "Not Authorized!" });

  }

  next();

};

export {authMiddleware};