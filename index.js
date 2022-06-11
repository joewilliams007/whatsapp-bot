const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth, Location, List, Buttons, MessageMedia, NoAuth } = require('whatsapp-web.js');
// const { Client, Location, List, Buttons, LocalAuth } = require('./index');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});

mysql = require('mysql'); 
const { exec } = require('child_process');
const { read } = require('fs');
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

client.on('message', async msg => {

console.log('MESSAGE RECEIVED', msg);
const value = removeFirstWord(msg.body)
const args = msg.body.split(" ")
var number;
const isGroup = msg.isGroup
if(msg.author=="undefined") {
    number = msg.from
} else if (msg.author==undefined) {
    number = msg.from
} else {
    number = msg.author
}

// msg.reply("MSG.AUTHOR: "+msg.author+"\nMSG.FROM: "+msg.from+"\nCHOOSINGs: "+number)
// console.log("MSG.AUTHOR: "+msg.author+"\nMSG.FROM: "+msg.from+"\nSETTING: "+number)
const dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
const registerMessage = "you are not registered. To register send the message: .register +yourname"
var isRegister = false;
var isQuote = msg.hasQuotedMsg

if (msg.body.split("")[0]==".") {
// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
connection.query( 
    `SELECT COUNT(*) AS RowCount FROM Users WHERE number='${number}'`
    , function (error, results1, fields) {
        if (error) throw error;
        console.log(results1[0].RowCount)

if (Number(results1[0].RowCount)<1) {
    isRegister = false;
} else {
    isRegister = true;
}
});


// user ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
connection.query( // get the users stuff
`SELECT * FROM Users
WHERE number="${number}"`
, function (error, results, fields) {
if (error) console.log(error.message);
var res = JSON.parse(JSON.stringify(results))

var style; 
try {
style = res[0].style
} catch (err) {}
try {
var username; 
username = res[0].username
} catch (err) {}
try {
var xp; 
xp = res[0].xp
} catch (err) {}
try {
var coins; 
coins = res[0].coins
} catch (err) {}
try {
var bio; 
bio = res[0].bio
} catch (err) {}
try {
var date; 
date = res[0].date
} catch (err) {}
try {
var commands; 
commands = res[0].messages
} catch (err) {}
try {
var id; 
id = res[0].user_id
} catch (err) {}

if (isRegister) {
    connection.query(
        `UPDATE Users
        SET messages = messages + 1
        WHERE number='${number}'`
        , function (error, results, fields) {
            if (error) console.log(error.message);
});
}
switch(msg.body.slice(1).split(" ")[0]) {
// cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "bot":
    if (!isRegister) return reply(registerMessage);
       reply(style+' Hai '+username);
break;
case "menu":
    if (!isRegister) return reply(registerMessage);
reply(
    
style+` Menu:

.bot
.me
.register
.style
.info
.users
.resend
.leaderboard
.delete`);
break;
case "delete":
    if (!isRegister) return reply(registerMessage);

    deleteMsg(msg,style)
    async function deleteMsg(msg, style) {
    const quotedMsg = await msg.getQuotedMessage();
        if (msg.hasQuotedMsg) {
            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                reply(style+' I can only delete my own messages');
            }
        }
    }
break;
case "button":
let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
client.sendMessage(msg.from, button);
break;
case "list":
let sections = [{title:'sectionTitle',rows:[{title:'ListItem1', description: 'desc'},{title:'ListItem2'}]}];
let list = new List('List body','btnText',sections,'Title','footer');
client.sendMessage(msg.from, list);
break;
case "join":
    if (!isRegister) return reply(registerMessage);
    const inviteCode = args[1];
    join()
    async function join() {
        try {
            await client.acceptInvite(inviteCode);
            reply('Joined the group!');
        } catch (e) {
            reply('That invite code seems to be invalid.');
        }
    }
break;
// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
if (isRegister) return reply(style+" you are already registered")
if (args.length<2) return reply("please enter a username")

connection.query( // register userstuff
`INSERT INTO Users (username, number, date, coins, xp, style, age, bio, messages) 
VALUES ("${args[1]}","${number}","${dateInSec}",100,0,"⛓️",0,"hey its me", 0)`
, function (error, results, fields) {
        if (error) throw error;
        console.log('Yey a new registration! >_< ');
    reply("registration successfull "+args[1])
});

break;
// account ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "me":
if (!isRegister) return reply(registerMessage)

var finalTime;
var time = (dateInSec - Number(date))

if(time/60/60/24>364) {                
    finalTime = time/60/60/24/365+". year(s) ago"                
} else if(time/60/60/24>30) {               
    finalTime = time/60/60/24/30+". month(s) ago"                
} else if (time/60/60/24>1){              
    finalTime = time/60/60/24+". day(s) ago"            
} else if (time/60/60>1){         
    finalTime = time/60/60+". hour(s) ago"        
} else if (time/60>1) {        
    finalTime = time/60+". minute(s) ago"      
} else {
    finalTime = time+".. second(s) ago"
}
var finalTime1 = finalTime.split(".")[0]+" "+finalTime.split(" ")[1]+" ago"


    reply(style+" username: "+username
    +"\n"+style+" xp: "+xp
    +"\n"+style+" money: "+coins
    +"\n"+style+" style: "+style
    +"\n"+style+" bio: "+bio
    +"\n"+style+" commands: "+commands
    +"\n"+style+" number: +"+number.split("@")[0]
    +"\n"+style+" userid: "+id
    +"\n"+style+" account created: "+finalTime1)
break;
// set style ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "style":
if (!isRegister) return reply(registerMessage)
if (args.length<2) return reply(style+" please enter a style")
    set("style", args[1])
    reply(args[1]+" style has been updated")
break;
// leaderboard ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "leaderboard":
case "leader":
if (!isRegister) return reply(registerMessage)
connection.query(
    `SELECT *
    FROM Users
    ORDER BY messages DESC`
    , function (error, results, fields) {
        if (error) console.log(error.message);
        leaderboard(JSON.parse(JSON.stringify(results)))
        async function leaderboard(res){
                var leaderboard = "LEADERBOARD";
                var position = 0	
                for (const item of res.values()) {  
                    position++
                    leaderboard+="\n "+position+". "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)+" "+JSON.stringify(item.messages)+" commands"
                }
                    
         reply(leaderboard.replace(/["]+/g, ''));
        }
    });
break;
// users ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "users":
if (!isRegister) return reply(registerMessage)
connection.query(
    `SELECT *
    FROM Users`
    , function (error, results, fields) {
        if (error) console.log(error.message);
        users(JSON.parse(JSON.stringify(results)))

        async function users(res){
                var user = "";	
                for (const item of res.values()) {  
                        user+="\n "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)
                }        
         reply(user.replace(/["]+/g, ''));
        }
    });
break;
case "resend":
    if (!isRegister) return reply(registerMessage)
    if (!isQuote) return reply("please quote a media")

    quote()
    async function quote(){
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
          const attachmentData = await quotedMsg.downloadMedia();
          client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
    
        }
    }
break;
// default ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
default:
    if (!isRegister) return reply(registerMessage)
    reply(style+" what even is this command")
    }
                        function reply(message){
                            msg.reply(message)
  
                        }

                        function set(target, replacement) {
                            connection.query(
                                `UPDATE Users
                                SET ${target} = "${replacement}"
                                WHERE number='${number}'`
                                , function (error, results, fields) {
                                    if (error) console.log(error.message);
                                });
                        }
                        
        }
    )}
});


client.initialize();

function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');
  
    if (indexOfSpace === -1) {
      return '';
    }
  
    return str.substring(indexOfSpace + 1);
}
