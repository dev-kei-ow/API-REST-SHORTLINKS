import { Router } from 'express';
import {
	createLink,
	getLinkId,
	getLinks,
	removeLink,
	updateLink,
} from '../controllers/linkController.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyLinkValidator, paramLinkValidator } from '../middlewares/validatorManager.js';

const linkRouter = Router();

//GET    /api/v1/links      -->  all links
linkRouter.get('/', requireToken, getLinks);

//GET    /api/v1/links/:id  -->  single link
linkRouter.get('/:nanoLink', getLinkId);

//POST   /api/v1/links      -->  create link
linkRouter.post('/', requireToken, bodyLinkValidator, createLink);

//PATCH  /api/v1/links/:id  --> update links
linkRouter.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink);

//DELETE  /api/v1/links/:id  --> remove links
linkRouter.delete('/:id', requireToken, paramLinkValidator, removeLink);

export default linkRouter;
