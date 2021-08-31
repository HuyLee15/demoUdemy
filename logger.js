const EvenEmitter = require('events');

let url = 'http://myLogger.io/log';

class Logger extends EvenEmitter {
    log(message) {
        console.log(message);

        this.emit('messageLogged', { id: 1, url: "http://" });
    }
}


module.exports = Logger;