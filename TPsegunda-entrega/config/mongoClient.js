import { MongoClient } from 'mongodb';
import { CNX_STR_MONGO, DB_NAME } from './config.js';

const mongoClient = new MongoClient(CNX_STR_MONGO);
await mongoClient.connect();

export const mongoDatabase = mongoClient.db(DB_NAME)