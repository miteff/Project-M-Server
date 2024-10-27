// connectDB.js
import pkg from 'pg'; 
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Подключение к базе данных PostgreSQL успешно установлено.");
    } catch (error) {
        console.error("Ошибка подключения к базе данных:", error);
        process.exit(1);
    }
};

export default connectDB;