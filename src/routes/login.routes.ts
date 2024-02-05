import { Router } from 'express';
import ctr from '../controllers';

const router = Router();

router.post('/', ctr.loginUser);

export default router;
