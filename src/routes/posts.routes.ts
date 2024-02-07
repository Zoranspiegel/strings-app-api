import { Router } from 'express';
import mdw from '../middlewares';
import ctr from '../controllers';

const router = Router();

router.get('/', mdw.authenticate, ctr.getUserPosts);

router.post('/', mdw.authenticate, ctr.createPost);

router.get('/feed', mdw.authenticate, ctr.getFeedPosts);

export default router;
