const qrcode = require('qrcode-terminal');

const { Client, LocalAuth, Location, List, Buttons } = require('whatsapp-web.js');
// const { Client, Location, List, Buttons, LocalAuth } = require('./index');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});



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
    const value = removeFirstWord(msg.body)
    const args = msg.body.split(" ")

if (msg.body.split("")[0]==".") {
switch(msg.body.slice(1).split(" ")[0]) {

case "bot":
            msg.reply('Hai '+msg._data.notifyName);
break;

case "menu":
            msg.reply('Menu:\n\n.bot');
break;

// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
    console.log(args[0])
    
    if (args[1].length<1) {
        msg.reply("please enter a username")
    } else {
        connection.query( 
            `SELECT FROM Plans WHERE number='${msg.author}'`

            , function (error, resultsN, fields) {
            
                console.log(resultsN)

                    accounts = "";
                    try {
                        accounts = JSON.parse(JSON.stringify(resultsN)).length
                    } catch (err) {
                        accounts = 0
                    }


                if (Number(accounts)>0) {
                    msg.reply("you are already registered")
                 } else {
                    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
                    connection.query( // register userstuff
                    `INSERT INTO Users (username, number, date, coins, xp, style, age, bio, messages) 
                    VALUES ("${args[1]}","${msg.author}","${dateInSec}",100,0,">_<",0,"hey its me", 0)`
                    , function (error, results, fields) {
                        if (error) throw error;
                        console.log('Yey a new registration! >_< ');
                        msg.reply("registration successfull "+args[1])
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

function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');
  
    if (indexOfSpace === -1) {
      return '';
    }
  
    return str.substring(indexOfSpace + 1);
  }