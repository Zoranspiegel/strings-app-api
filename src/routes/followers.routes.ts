import { Router } from 'express';
import mdw from '../middlewares';
import ctr from '../controllers';

const router = Router();

router.get('/', mdw.authenticate, ctr.getFollowers);

export default router;
