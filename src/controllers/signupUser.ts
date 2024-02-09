import type { Request, Response } from 'express';
import { getClient } from '../db';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';

const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string, password: string } = req.body;

  const client = getClient();
  await client.connect();

  const userExistsRes = await client.query(
    'select id from users where username ilike $1',
    [username]
  );

  if (userExistsRes.rowCount) {
    res.status(400).json({ error: 'Username already taken' });
    return;
  }

  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  const newUserRes = await client.query(
    'insert into users (username, password) values ($1, $2) returning id',
    [username, hash]
  );

  await client.end();

  if (!newUserRes.rowCount) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  const userID: string = newUserRes.rows[0].id;
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
  res.status(201).json({ msg: 'Sign up success' });
};

export default signupUser;
