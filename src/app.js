import express from 'express';
import exphbs from 'express-handlebars';
import { Server as SocketServer } from 'socket.io'; // Corregido el nombre del import

const app = express();
const PUERTO = 8080;

app.use(express.static('./src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el Puerto: ${PUERTO}`);
});

// Generamos una instancia de Socket.io del lado de backend.
const io = new SocketServer(httpServer); 

let messages = [];

// Establecemos la conexión.
io.on('connection', () => {
    console.log('Nuevo usuario conectado');
});
