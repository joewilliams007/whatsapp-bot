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
            msg.reply('Hai '+msg.getInfo);
          break;
        case ".button":
            let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
            client.sendMessage(msg.from, button);
          break;
        default:
          // code block
      }
});

client.initialize();