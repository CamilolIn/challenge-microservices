import { MongoClient } from 'mongodb';
import envConfig from './env.config';

const {
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_HOST
} = envConfig;

const mongoUri = NODE_ENV === 'production' 
  ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
  : `mongodb://localhost:27017`;

export const dbClient = new MongoClient(mongoUri);