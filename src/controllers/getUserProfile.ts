import type { Response } from 'express';
import type { MyRequest } from '../../types';
import { getClient } from '../db';

export default async function getUserProfile (req: MyRequest, res: Response): Promise<void> {
  const client = getClient();
  await client.connect();

  const loggedUserRes = await client.query(
    'select username, avatar, is_admin from users where id = $1',
    [req.loggedUserID]
  );

  if (!loggedUserRes.rowCount) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  await client.end();

  const loggedUser = loggedUserRes.rows[0];

  res.status(200).json(loggedUser);
}
