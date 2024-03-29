import mongoose from 'mongoose';

// const { Schema, model } = mongoose;

const linkSchema = new mongoose.Schema({
	longLink: {
		type: String,
		required: true,
		trim: true,
	},
	nanoLink: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},

	uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

export const Link = mongoose.model('Link', linkSchema);
