import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function gerPostByID (req: MyRequest, res: Response): Promise<void> {
  const client = getClient();
  await client.connect();

  const foundPostRes = await client.query(
    `select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id 
    where p.user_id = $1 and p.id = $2`,
    [req.loggedUserID, req.params.id]
  );

  await client.end();

  if (!foundPostRes.rowCount) {
    res.status(404).json({ error: 'Post not found' });
  }

  const foundPost = foundPostRes.rows[0];

  res.status(200).json(foundPost);
}
