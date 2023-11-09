import dotenv from 'dotenv';
import winston from 'winston';

let path = '';
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  path = `.${process.env.NODE_ENV}.env`;
} else {
  path = '.env';
}

dotenv.config({
  path
});

import { MongoClient } from 'mongodb';
import db from './config/db';
import logger from 'shared/config/log';

declare global {
  namespace NodeJS {
    interface Global {
      db: MongoClient;
      logger: winston.Logger;
    }
  }
}

global.db = db;
global.logger = logger;
