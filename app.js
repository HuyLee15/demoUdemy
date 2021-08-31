const EvenEmitter = require('events');

const emitter = new EvenEmitter();

emitter.on('messageLogged', () => {
    console.log('Lister caller');
})

emitter.emit('messageLogged');