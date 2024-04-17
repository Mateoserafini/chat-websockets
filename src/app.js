import express from 'express';
import exphbs from 'express-handlebars';
import { Server as SocketServer } from 'socket.io'; 

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

const io = new SocketServer(httpServer); 

let messages = [];
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", data => {
        messages.push(data);
        io.emit("messagesLogs", messages);

    })
})
