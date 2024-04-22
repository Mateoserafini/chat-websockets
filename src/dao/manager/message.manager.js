import messageModel from '../models/message.model.js'

class MessageManager{
    async addMessage(){
        try{
            await messageModel.create(data);
        }catch(error) {
            console.log("Error al enviar el mensaje(manager)", error);
            throw error;  
        }
    }

    async getMessage(){
        try{
            await messageModel.create(data);
        }catch(error) {
            console.log("Error al buscar los mensajes(manager)", error);
            throw error;  
        }
    }
}

export default MessageManager;