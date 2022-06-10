const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    switch(msg.body) {
        case ".bot":
            msg.reply('Hai '+msg.getInfo+" "+msg.getContact+" "+msg.title);
          break;
        case y:
          // code block
          break;
        default:
          // code block
      }
});

client.initialize();