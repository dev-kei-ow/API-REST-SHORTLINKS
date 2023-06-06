import { validationResult } from 'express-validator';

export const validationResultExpress = (req, res, next) => {
	//---

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		//---
		return res.status(400).json({ errors: errors.array() });
	}

	//En el caso de que no hay ningun error en la solicitud, sigue con el siguiente middleware
	next();
};
