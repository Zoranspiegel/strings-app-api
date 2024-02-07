import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function createPost (req: MyRequest, res: Response): Promise<void> {
  const { content } = req.body;

  const client = getClient();
  await client.connect();

  const newPostRes = await client.query(
    'insert into posts (user_id, content) values ($1, $2) returning *',
    [req.loggedUserID, content]
  );

  await client.end();

  res.status(201).json({ msg: 'Post successfully created', data: newPostRes.rows[0] });
}
