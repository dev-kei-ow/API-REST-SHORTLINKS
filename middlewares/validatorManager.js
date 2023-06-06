import { validationResult, body, param } from 'express-validator';
import axios from 'axios';

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

export const paramLinkValidator = [
	//---

	param('id', 'Formato no válido (expressValidator)').trim().notEmpty().escape(),
	validationResultExpress,
];

export const bodyLinkValidator = [
	//---

	body('longLink', 'formato del	link incorrecto')
		.trim()
		.notEmpty()
		.custom(async (value) => {
			try {
				//--
				if (!value.startsWith('https://')) {
					value = 'https://' + value;
				}

				console.log(value);

				await axios.get(value);

				return value;
			} catch (err) {
				//--
				// console.log(err);
				throw new Error('Not found longlink 404');
			}
		}),

	validationResultExpress,
];

export const bodyRegisterValidator = [
	//---

	body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),

	body('password', 'Minimo 6 carácteres').trim().isLength({ min: 6 }),

	body('password', 'Formato de password incorrecto').custom((value, { req }) => {
		if (value !== req.body.repassword) {
			throw new Error('No coinciden las constraseñas');
		}

		return value;
	}),

	validationResultExpress,
];

export const bodyLoginValidator = [
	//---

	body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),

	body('password', 'Minimo 6 carácteres').trim().isLength({ min: 6 }),

	validationResultExpress,
];
