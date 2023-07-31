import { nanoid } from 'nanoid';
import { Link } from '../models/Link.js';

export const getLinks = async (req, res) => {
	try {
		const links = await Link.find({ uid: req.uid });

		return res.json({ links });
	} catch (err) {
		return res.status(500).json({ error: 'error de servidor' });
	}
};

export const getLinkId = async (req, res) => {
	try {
		//el /:id viaja como paramas y se pasa a req.params
		const { nanoLink } = req.params;
		const link = await Link.findOne({ nanoLink });

		if (!link) return res.status(404).json({ error: 'No existe el link' });

		return res.json({ longLink: link.longLink });
	} catch (err) {
		console.log(err);

		if (err.kind === 'ObjectId') {
			return res.status(403).json({ error: 'Formato de id incorrecto' });
		}
		return res.status(500).json({ error: 'error de servidor' });
	}
};

//Para un CRUD tradicional
// export const getLinkIdV1 = async (req, res) => {
// 	//---

// 	try {
// 		//--

// 		//el /:id viaja como paramas y se pasa a req.params
// 		const { id } = req.params;
// 		const link = await Link.findById(id);

// 		if (!link) return res.status(404).json({ error: 'No existe el link' });

// 		if (!link.uid.equals(req.uid))
// 			return res.status(401).json({ error: 'No le pertenece este id' });

// 		return res.json({ link });
// 	} catch (err) {
// 		//--
// 		console.log(err);

// 		if (err.kind === 'ObjectId') {
// 			return res.status(403).json({ error: 'Formato de id incorrecto' });
// 		}
// 		return res.status(500).json({ error: 'error de servidor' });
// 	}
// };

export const createLink = async (req, res) => {
	try {
		let { longLink } = req.body;

		if (!longLink.startsWith('https://')) {
			longLink = 'https://' + longLink;
		}

		const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });

		const newLink = await link.save();

		return res.status(201).json({ newLink });
	} catch (err) {
		return res.status(500).json({ error: 'error de servidor' });
	}
};

export const updateLink = async (req, res) => {
	try {
		//el /:id viaja como params y se pasa a req.params
		const { id } = req.params;

		const { longLink } = req.body;

		console.log(longLink);

		if (!longLink.startsWith('https://')) {
			longLink = 'https://' + longLink;
		}

		const link = await Link.findById(id);

		if (!link) return res.status(404).json({ error: 'No existe el link' });

		if (!link.uid.equals(req.uid))
			return res.status(401).json({ error: 'No le pertenece este id' });

		//actualizar
		link.longLink = longLink;
		await link.save();

		return res.json({ link });
	} catch (err) {
		console.log(err);

		if (err.kind === 'ObjectId') {
			return res.status(403).json({ error: 'Formato de id incorrecto' });
		}
		return res.status(500).json({ error: 'error de servidor' });
	}
};

export const removeLink = async (req, res) => {
	try {
		//el /:id viaja como paramas y se pasa a req.params
		const { id } = req.params;
		const link = await Link.findById(id);

		if (!link) return res.status(404).json({ error: 'No existe el link' });

		if (!link.uid.equals(req.uid))
			return res.status(401).json({ error: 'No le pertenece este id' });

		// console.log(link._id);

		//En el argumento del metodo deleteOne buscamos _id de la colleccion y el link._id se refiere al valor del _id
		await Link.deleteOne({ _id: link._id });

		return res.json({ link });
	} catch (err) {
		console.log(err);

		if (err.kind === 'ObjectId') {
			return res.status(403).json({ error: 'Formato de id incorrecto' });
		}
		return res.status(500).json({ error: 'error de servidor' });
	}
};
