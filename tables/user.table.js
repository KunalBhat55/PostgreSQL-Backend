import { dbClient } from "../db/db.js";

const userTable = () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

  dbClient
    .query(createTableQuery)
    .then(() => console.log("Table created successfully"))
    .catch(() => console.log("Error creating table:", err));
};

export {userTable};
