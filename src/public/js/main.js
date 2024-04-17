const socket = io();

let user;

const chatBox = document.getElementById('chatBox');

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa un usuario',
    inputValidator: (value) =>{
        return !value && 'Necesitas identificarte';
    },
    allowOutsideClick: false
}).then ( result => {
    user = result.value;
}) 

chatBox.addEventListener('keyup', (event) =>{
    if(event.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user: user, message: chatBox.value});
            chatBox.value = '';
        };
    };
});

socket.on("messagesLogs", data => {
    const log = document.getElementById("mensajeLogs");
    let messages = "";

    data.forEach( message => {
        messages = messages + `${message.user}: ${message.message} <br>`
    })
    log.innerHTML = messages;
})
