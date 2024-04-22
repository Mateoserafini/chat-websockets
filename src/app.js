import express from 'express';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io';
import './config/mongoose.js';

import viewsRouter from './routes/view.router.js';

const app = express();
const PUERTO = 8080;

// Configuración de directorio estático
app.use(express.static('./src/public'));

// Configuración para manejar JSON y datos codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars como motor de plantillas
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Usar el router para las vistas
app.use("/", viewsRouter);

// Inicialización del servidor HTTP
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el Puerto: ${PUERTO}`);
});

// Inicialización del servidor de Socket.io
const io = new Server(httpServer);




