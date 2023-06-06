import { Link } from '../models/Link.js';

export const redirectLink = async (req, res) => {
	//---
	try {
		//--

		//el /:id viaja como paramas y se pasa a req.params
		const { nanoLink } = req.params;
		const link = await Link.findOne({ nanoLink });

		if (!link) return res.status(404).json({ error: 'No existe el link' });

		return res.redirect(link.longLink);
	} catch (err) {
		//--
		console.log(err);

		if (err.kind === 'ObjectId') {
			return res.status(403).json({ error: 'Formato de id incorrecto' });
		}
		return res.status(500).json({ error: 'error de servidor' });
	}
};
