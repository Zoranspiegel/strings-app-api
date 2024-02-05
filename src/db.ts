import { Client } from 'pg';

export function getClient (): Client {
  const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    port: Number(process.env.PG_PORT)
  });

  return client;
}
