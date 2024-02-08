import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function deletePost (req: MyRequest, res: Response): Promise<void> {
  const client = getClient();
  await client.connect();

  const deletedPost = await client.query(
    'delete from posts where user_id = $1 and id = $2 returning *',
    [req.loggedUserID, req.params.id]
  );

  if (!deletedPost.rowCount) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  await client.end();
  res.status(200).json({ msg: 'Post successfully deleted', data: deletedPost.rows[0] });
}
