import type { Response } from 'express';
import type { MyRequest } from '../../types';

export default async function logoutUser (req: MyRequest, res: Response): Promise<void> {
  res.cookie('jwt-token', '', {
    sameSite: 'none',
    httpOnly: true,
    secure: true
  });
  res.status(200).json({ msg: 'Log out success' });
}
