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

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log('MESSAGE RECEIVED', msg);
    const value = msg.body.split(" ",2)[1]+" "
    const args = value.split(" ")

if (msg.body.split("")[0]==".") {
var switch_helper =  msg.body.replace(".","")+" #"
console.log(switch_helper.split(" ")[0])
switch(switch_helper.split(" ")[0]) {

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
        connection.query( 
            `SELECT COUNT(*) AS RowCount FROM Plans WHERE number='${msg.author}'`

            , function (error, resultsN, fields) {
            
                




                 if (Number(resultsN[0].RowCount)>0) {
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