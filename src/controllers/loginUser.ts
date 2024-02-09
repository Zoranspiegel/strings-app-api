import type { Response, Request } from 'express';
import { getClient } from '../db';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string, password: string } = req.body;

  const client = getClient();
  await client.connect();

  const loggingUserRes = await client.query(
    'select id, password from users where username ilike $1',
    [username]
  );

  if (!loggingUserRes.rowCount) {
    res.status(404).json({ error: 'User does not exist' });
    return;
  }

  const hash: string = loggingUserRes.rows[0].password;
  const match = await bcrypt.compare(password, hash);

  if (!match) {
    res.status(400).json({ error: 'Invalid password' });
    return;
  }

  await client.end();

  const userID: string = loggingUserRes.rows[0].id;
  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userID)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(jwtSecret);

  res.cookie('jwt-token', token, {
    sameSite: 'none',
    httpOnly: true,
    secure: true
  });
  res.status(200).json({ msg: 'Log in success' });
};

export default loginUser;
