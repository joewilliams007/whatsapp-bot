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
    const value = msg.body.split(" ",2)[1]
    const args = value.split(" ")

if (msg.body.split("")[0]==".") {

switch(msg.body.split(".")[1].split(" ")[0]) {

case "bot":
            msg.reply('Hai '+msg._data.notifyName);
break;

case "menu":
            msg.reply('Menu:\n\n.bot');
break;

// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
    console.log(args[0])
    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
    if (args[0].length<1) {
        msg.reply("please enter a username")
    } else {

        connection.query( // register userstuff
            `SELECT * FROM test WHERE text LIKE '${args[0]}' LIMIT 1`
            , function (error, results, fields) {
                if (error) console.log("error");
                 if (results[0] != undefined) {
                    msg.reply("you are already registered")
                 } else {
                    connection.query( // register userstuff
                    `INSERT INTO Users (username, number, date, coins, xp, style, age, bio, messages) 
                    VALUES ("${args[0]}","${msg.author}","${dateInSec}",100,0,">_<",0,"hey its me", 0)`
                    , function (error, results, fields) {
                        if (error) throw error;
                        console.log('Yey a new registration! >_< ');
                        msg.reply("registration successfull "+args[0])
                    });
                 }
        });

    }
break;

default:
          msg.reply("what even is this command")
      }
    }
});


client.initialize();