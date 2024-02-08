import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function editPost (req: MyRequest, res: Response): Promise<void> {
  const client = getClient();
  await client.connect();

  const newContent = req.body.content;
  console.log(newContent);
  const editedPostRes = await client.query(
    'update posts set content = $1 where user_id = $2 and id = $3 returning *',
    [newContent, req.loggedUserID, req.params.id]
  );

  await client.end();

  if (!editedPostRes.rowCount) {
    res.status(404).json({ msg: 'Post not found' });
    return;
  }

  const editedPost = editedPostRes.rows[0];

  res.status(200).json({ msg: 'Post successfully edited', data: editedPost });
}
