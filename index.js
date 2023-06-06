//Lee las variables de entorno y se ejecuta al iniciar el servidor
import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auths.js';
import linkRouter from './routes/links.js';
import redirectRouter from './routes/redirects.js';

import cookieParser from 'cookie-parser';

//Inicializar el servidor con el metodo express()
const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || whiteList.includes(origin)) {
				return callback(null, origin);
			}
			return callback('Error de CORS origin: ' + origin + 'No autorizado!');
		},
	})
);

//Con este middleware estamos habilitando que pueda leer las solicitudes en json
app.use(express.json());
app.use(cookieParser());

//Routes raiz ; /api/v1 : Todas las rutas que esten en authRouter van a tener esta base
app.use('/', redirectRouter); //Ejemplo Back redirect opcional
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);

//process.env -> accede a todas las varibles del archivo .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('💥💥💥 http://localhost:' + PORT));
