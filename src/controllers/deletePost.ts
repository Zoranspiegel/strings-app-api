import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function deletePost (req: MyRequest, res: Response): Promise<void> {
  const client = getClient();
  await client.connect();

  const deletedPostRes = await client.query(
    'delete from posts where user_id = $1 and id = $2 returning *',
    [req.loggedUserID, req.params.id]
  );

  await client.end();

  if (!deletedPostRes.rowCount) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.status(200).json({ msg: 'Post successfully deleted', data: deletedPostRes.rows[0] });
}
