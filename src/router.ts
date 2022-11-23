import { Router } from 'express';
import authMiddleware from './app/middleware/auth';

import { createSale } from './app/useCases/createSale';
import { createUser } from './app/useCases/createUser';
import { loginUser } from './app/useCases/loginUser';

export const router = Router();

router.post('/login', loginUser);
router.post('/user', createUser);

router.use(authMiddleware);

router.post('/sale', createSale);
