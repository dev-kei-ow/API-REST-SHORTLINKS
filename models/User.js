import mongoose from 'mongoose';
// import {model, schema} from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		index: { unique: true },
	},
	password: {
		type: String,
		required: true,
	},
});

//Antes de guardarlo en la bd va entrar aki
userSchema.pre('save', async function (next) {
	//Hace referencia a todo el userSchema
	const user = this;

	//Va preguntar si se esta modificando o si se esta creando por primera vez, cuando no se esta modificando no va entrar en este if
	if (!user.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (err) {
		console.log(err);
		throw new Error('Fallo el hash de contraseña');
	}
});

userSchema.methods.comparePassword = async function (clientPassword) {
	return await bcrypt.compare(clientPassword, this.password);
};

//'User' -> Esto es como podemos relacionar con otros esquemas, por default se guarda users
export const User = mongoose.model('User', userSchema);
