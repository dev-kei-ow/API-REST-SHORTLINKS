import { tokenVerificationErrors } from '../utils/tokenManager.js';
import jwt from 'jsonwebtoken';

export const requireRefreshToken = (req, res, next) => {
	try {
		//Leer la cookie del usuario
		const cookieTokenRefresh = req.cookies.refreshToken;

		if (!cookieTokenRefresh) throw new Error('No existe el token');

		//Si el usuario tiene el refresh token lo verificamos con la clave JWT_REFRESH
		const { uid } = jwt.verify(cookieTokenRefresh, process.env.JWT_REFRESH);

		req.uid = uid;

		next();
	} catch (err) {
		console.log(err);

		res.status(401).json({ error: tokenVerificationErrors[err.message] });
	}
};
