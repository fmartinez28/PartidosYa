import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
}

export const pool = new Pool(config);
export const query = (text, params) => pool.query(text, params);
