import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV?.trim() || 'development';

dotenv.config({
  path: path.resolve(process.cwd(), `${nodeEnv}.env`)
});

export default {
  NODE_ENV: nodeEnv,
  PORT: process.env.PORT ?? 8080,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
}