import mongoose from 'mongoose';

try {
	//---
	await mongoose.connect(process.env.URI_MONGO);
	console.log('Connect DB Ok!!😎');
} catch (err) {
	//---
	console.log('Error Fatallity💣' + err);
}
