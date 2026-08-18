import 'dotenv/config'
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    port: process.env.DB_PORT,
    dialect: 'postgres',
})