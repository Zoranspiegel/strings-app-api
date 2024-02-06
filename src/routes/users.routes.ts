import { Router } from 'express';
import mdw from '../middlewares';
import ctr from '../controllers';

const router = Router();

router.get('/profile', mdw.authenticate, ctr.getUserProfile);

export default router;
