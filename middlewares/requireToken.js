import jwt from 'jsonwebtoken';
import { tokenVerificationErrors } from '../utils/tokenManager.js';

export const requireToken = (req, res, next) => {
	try {
		let token = req.headers?.authorization;

		if (!token) throw new Error('No Bearer');

		token = token.split(' ')[1];

		//Hacemos la desestructuracion del payload y sacamos el uid
		const { uid } = jwt.verify(token, process.env.SECRET_MAGIC);

		req.uid = uid;

		next();
	} catch (err) {
		return res.status(401).send({ error: tokenVerificationErrors[err.message] });
	}
};
