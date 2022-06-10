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
            msg.reply('Hai '+msg.author);
          break;
        case ".menu":
            msg.reply('Menu:\n\n.bot');
          break;
        default:
          // code block
      }
});

client.initialize();