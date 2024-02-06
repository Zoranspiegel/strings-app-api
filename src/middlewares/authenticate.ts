import type { Response, NextFunction } from 'express';
import type { MyRequest } from '../../types';
import { jwtVerify } from 'jose';

export default async function (req: MyRequest, res: Response, next: NextFunction): Promise<void> {
  const token: string = req.cookies['jwt-token'];
  if (!token) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  try {
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload?.sub) {
      res.status(401).json({ error: 'Unauthenticated' });
      return;
    }

    const loggedUserID: string = payload.sub;
    req.loggedUserID = loggedUserID;
  } catch (error) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }
  next();
}
