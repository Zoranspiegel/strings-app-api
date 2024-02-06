import { Client } from 'pg';
import dotenv from 'dotenv';

if (!process.env.PORT) {
  console.log('Loading dotenv config');
  dotenv.config();
}

export function getClient (): Client {
  if (process.env.PG_RAILWAY_DB) {
    const client = new Client(process.env.PG_RAILWAY_DB);
    return client;
  } else {
    const client = new Client({
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      host: process.env.PG_HOST,
      database: process.env.PG_DB,
      port: Number(process.env.PG_PORT)
    });

    return client;
  }
}
