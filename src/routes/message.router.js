import express from 'express';
const router = express.Router();

// Importar el manejador de mensajes y `io` o `socket` desde otro archivo
import MessageManager from '../dao/manager/message.manager';
const messageManager = new MessageManager();

// Recuerda importar `io` desde el archivo donde se configura `socket.io`
import { io } from '../app.js';

router.post("/", async (req, res) => {
    try {
        // Obtén el mensaje del cuerpo de la solicitud
        const message = req.body;

        // Agrega el mensaje usando el manejador
        await messageManager.addMessage(message);

        // Obtén los mensajes actualizados
        const messages = await messageManager.getMessage();

        // Emite los mensajes a través de `io`
        io.sockets.emit("message", messages);

        // Envía una respuesta exitosa
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error al manejar la solicitud POST", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/", async (req, res) => {
    try {
        // Obtén los mensajes usando el manejador
        const messages = await messageManager.getMessage();

        // Emite los mensajes a través de `io`
        io.sockets.emit("message", messages);

        // Envía los mensajes como respuesta JSON
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error al manejar la solicitud GET", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
