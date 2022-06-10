const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();
mysql = require('mysql'); 
const { exec } = require('child_process');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'johannw2004',
database : 'db_bot',
charset : 'utf8mb4'
});
connection.connect();

client.on('qr', qr => {
   qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log('MESSAGE RECEIVED', msg);
    const value = msg.body.split("")[1]
    const args = value.split(" ")

    if (msg.body.split("")[0]==".") {

    switch(msg.body.split(".",2)[1]) {
        case "bot":
            msg.reply('Hai '+msg._data.notifyName);
          break;
case "menu":
            msg.reply('Menu:\n\n.bot');
break;

// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
    if (args[0].length<1) return msg.reply("please enter a username")

        connection.query( // register userstuff
            `SELECT * FROM test WHERE text LIKE '${args[0]}' LIMIT 1`
            , function (error, results, fields) {
                if (error) console.log("error");
                console.log(results[0])
        });

		/*connection.query( // register userstuff
				`INSERT INTO Users (username, number, date, coins, xp, style, age, bio, messages) 
				VALUES ("${args[0]}","${args[1]}","${dateInSec}")`
				, function (error, results, fields) {
					if (error) throw error;
					console.log('Yey a new registration! >_< ');
		});*/
break;

default:
          msg.reply("what even is this command")
      }
    }
});


client.initialize();