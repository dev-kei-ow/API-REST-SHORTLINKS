import { Router } from 'express';
import {
	infoUser,
	login,
	register,
	refreshToken,
	logout,
} from '../controllers/authController.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

const authRouter = Router();

authRouter.post('/register', bodyRegisterValidator, register);
authRouter.post('/login', bodyLoginValidator, login);

authRouter.get('/protected', requireToken, infoUser);
authRouter.get('/refresh', requireRefreshToken, refreshToken);
authRouter.get('/logout', logout);

export default authRouter;
