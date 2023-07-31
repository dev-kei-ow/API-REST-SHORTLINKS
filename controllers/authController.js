import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
	const { email, password } = req.body;

	try {
		//alternativa dos buscamdo por email y validar antes de hacer la instancia de User
		let user = await User.findOne({ email });

		if (user) throw { code: 11000 };

		user = new User({ email, password });
		await user.save();

		//Generar el token JWT
		const { token, expiresIn } = generateToken(user.id);
		generateRefreshToken(user.id, res);

		return res.status(201).json({ token, expiresIn });
	} catch (err) {
		console.log(err);

		//Alternativa por defecto mongoose
		if (err.code === 11000) {
			return res.status(400).json({ error: 'Ya existe este usuario' });
		}

		return res.status(500).json({ error: 'Error de servidor' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email });

		if (!user) return res.status(403).json({ error: 'No existe este usuario' });

		const isValidPassword = await user.comparePassword(password);

		if (!isValidPassword) {
			return res.status(403).json({ error: 'Contraseña incorrecta' });
		}

		//Generar el token JWT
		const { token, expiresIn } = generateToken(user.id);
		generateRefreshToken(user.id, res);

		return res.json({ token, expiresIn });
	} catch (err) {
		console.log(err);

		return res.status(500).json({ error: 'Error de server' });
	}
};

export const infoUser = async (req, res) => {
	try {
		const user = await User.findById(req.uid).lean();

		return res.json({ email: user.email, uid: user.id });
	} catch (err) {
		return res.status(500).json({ err: 'Error de server' });
	}
};

export const refreshToken = (req, res) => {
	try {
		//Generamos un nuevo token de seguridad con el uid del cliente
		const { token, expiresIn } = generateToken(req.uid);

		//Y Ese token de seguridad lo devolvemos a la vista como peticion
		return res.json({ token, expiresIn });
	} catch (err) {
		return res.status(500).json({ err: 'Error de server' });
	}
};

export const logout = (req, res) => {
	res.clearCookie('refreshToken');
	res.json({ ok: true });
};
