import { Router } from 'express';
import { redirectLink } from '../controllers/redirectController.js';

const redirectRouter = Router();

redirectRouter.get('/:nanoLink', redirectLink);

export default redirectRouter;
