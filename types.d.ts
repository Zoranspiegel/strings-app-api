import type { Request } from 'express';

export interface MyRequest extends Request {
  loggedUserID?: string
}
