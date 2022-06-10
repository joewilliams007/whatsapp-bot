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
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body.split("")[0]==".") {

    switch(msg.body.split(".",2)[1]) {
        case "bot":
            msg.reply('Hai '+msg._data.notifyName);
          break;
        case "menu":
            msg.reply('Menu:\n\n.bot');
          break;

        default:
          msg.reply("what even is this command")
      }
    }
});


client.initialize();