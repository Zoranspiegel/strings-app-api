import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function (req: MyRequest, res: Response): Promise<void> {
  const page = Number(req.query.page) || 0;
  const limit = 10;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const feedPosts = await client.query(
    `select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id 
    where u.id in (select user_id from follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3`,
    [req.loggedUserID, limit, offset]
  );

  await client.end();

  res.status(200).json(feedPosts.rows);
}
