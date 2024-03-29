import pg from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});


const dbClient = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

export { dbClient };
