import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function getFollowedUsers (req: MyRequest, res: Response): Promise<void> {
  const page = Number(req.query.page) || 0;
  const limit = 5;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const userFollowersRes = await client.query(
    `select u.id, u.username, u.avatar from users u 
    inner join follows f on u.id = f.user_id 
    where f.follower_id = $1 
    order by f.created_at desc limit $2 offset $3`,
    [req.loggedUserID, limit, offset]
  );

  await client.end();

  const userFollowers = userFollowersRes.rows;

  res.status(200).json(userFollowers);
}
