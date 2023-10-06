import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
}

export const pool = new Pool(config);
export const query = (text, params) => pool.query(text, params);
