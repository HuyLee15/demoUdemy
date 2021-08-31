const EvenEmitter = require('events');

const emitter = new EvenEmitter();

emitter.on('messageLogged', (arg) => {
    console.log('Lister caller', );
})

emitter.emit('messageLogged', { id: 1, });

console.log("say hello");