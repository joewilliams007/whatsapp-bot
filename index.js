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
        case ".info":
            let chat = await msg.getChat();
            if (chat.isGroup) {
                msg.reply(`
                    *Group Details*
                    Name: ${chat.name}
                    Description: ${chat.description}
                    Created At: ${chat.createdAt.toString()}
                    Created By: ${chat.owner.user}
                    Participant count: ${chat.participants.length}
                `);
            } else {
                msg.reply('This command can only be used in a group!');
            }
          break;
        default:
          // code block
      }
});

client.initialize();