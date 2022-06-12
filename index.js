const qrcode = require('qrcode-terminal');
const fs = require('fs');

const _slot = JSON.parse(fs.readFileSync('./result/games/slot.json'));
const _truth = JSON.parse(fs.readFileSync('./result/ranswer/truth.json'));
const _dare = JSON.parse(fs.readFileSync('./result/ranswer/dare.json'));
const _gay = JSON.parse(fs.readFileSync('./result/ranswer/gaymeter.json'));
const _love = JSON.parse(fs.readFileSync('./result/ranswer/lovemeter.json'));
const _animal = JSON.parse(fs.readFileSync('./result/ranswer/animal.json'));
const _facts = JSON.parse(fs.readFileSync('./result/ranswer/facts.json'));
const _pokemon = JSON.parse(fs.readFileSync('./result/ranswer/pokemon.json'));

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
var last_claim;
try {
last_claim = res[0].last_claim
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
case "echo":
    if (!isRegister) return reply(registerMessage);
    if (args.length<2) return reply ("enter a message")
       client.sendMessage(msg.from,value);
break;
case "menu":
    if (!isRegister) return reply(registerMessage);
    var yourDate = new Date()
    var claim;
    if (last_claim==yourDate.toISOString().split('T')[0]) {
        claim = "\nalready claimed today"
    } else {
        claim = "\n.claim for free $$"
    }

reply(


style+` Menu:

.bot
.me
.search
.song
.user
.register
.style
.username
.bio
.sticker
.echo
.users
.resend
.pokemon
.fact
.gay
.love
.slot
.truth
.dare
.animal
.transfer
.leaderboard
.users
.delete
`
+claim);
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
// slot ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "slot":
if (!isRegister) return reply(registerMessage);
if (coins < 5) return reply(`${style} You dont have enough money`)
const slot1 = _slot[Math.floor(Math.random() * _slot.length)]
const slot2 = _slot[Math.floor(Math.random() * _slot.length)]
const slot3 = _slot[Math.floor(Math.random() * _slot.length)]
const slot4 = _slot[Math.floor(Math.random() * _slot.length)]
const slot5 = _slot[Math.floor(Math.random() * _slot.length)]
const slot6 = _slot[Math.floor(Math.random() * _slot.length)]
const slot7 = _slot[Math.floor(Math.random() * _slot.length)]
const slot8 = _slot[Math.floor(Math.random() * _slot.length)]
const slot9 = _slot[Math.floor(Math.random() * _slot.length)]

var winmsg;
var winAmount;
var looseorwin
if ((slot1 == slot2) && slot2 == slot3) {	
    winmsg = "jackpot"
    winAmount = 100
} else if (slot1 == slot2) {
    winmsg = "small win"
    winAmount = 13
} else if (slot2 == slot3) {	
    winmsg = "small win"
    winAmount = 13
} else if (slot1 == slot3) {	
    winmsg = "small win"
    winAmount = 13
} else {
    winmsg = "you lost"
    winAmount = -5
}

if (winAmount<0) {
    looseorwin = "lost"
} else {
    looseorwin = "won"
}

    connection.query(
        `UPDATE Users
        SET coins = "${coins+winAmount}"
        WHERE number='${number}'`
        , function (error, results, fields) {
            if (error) console.log(error.message);
        });

reply(style+` 𝚂𝚕𝚘𝚝

${slot4}${slot5}${slot6}
- - - - - - - - - \n${slot1}${slot2}${slot3} ☜︎ ${winmsg} ♕︎
- - - - - - - - - \n${slot7}${slot8}${slot9}

you ${looseorwin} ${winAmount}$!
you have $${coins+winAmount} left!`)

break;
// claim ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "claim":
if (!isRegister) return reply(registerMessage)

var yourDate = new Date()
if (last_claim==yourDate.toISOString().split('T')[0]) return reply (style+" already claimed today")

connection.query(
    `UPDATE Users
    SET coins = coins + 25, xp = xp + 10, last_claim = "${yourDate.toISOString().split('T')[0]}"
    WHERE number='${number}'`
    , function (error, results, fields) {
        if (error) console.log(error.message);
    });

    reply(style+" claimed 25$")
break;
// transfer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "transfer":
if (!isRegister) return reply(registerMessage)
if (args.length<3) return reply("please send id of target and enter amount. Example: .transfer 50 1\n in this example 50 is the amount and 1 the id")
if (Number(args[1])<1||Number(args[1])==NaN) return reply("please enter a valid amount")

var amount = args[1]

    connection.query(
    `UPDATE Users
    SET coins = coins - ${amount}
    WHERE number='${number}'`
    , function (error, results, fields) {
        if (error) {
            console.log(error.message);
            reply(style+" there was an error transfering your money+\n\n"+error.message)
        } else {
            connection.query(
                `UPDATE Users
                SET coins = coins + ${amount}
                WHERE user_id=${args[2]}`
                , function (error, results, fields) {

                    if (error) {
                        console.log(error.message);
                        reply(style+" there was an error with the account you targeted. cancelling the transfer+\n\n"+error.message)

                        connection.query(
                            `UPDATE Users
                            SET coins = coins + ${amount}
                            WHERE number='${number}'`
                            , function (error, results, fields) {

                        });

                    } else {
                        var urNEw = Number(coins)-Number(amount)
                        reply(style+" successfully transfered "+amount+"$ to user with id "+args[2]+" you now have "+urNEw+"$ left")
                    }   
            });
        }
    });

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
case "user":
if (!isRegister) return reply(registerMessage)
if (args.length<2) return reply("enter the users id")
connection.query( // get the users stuff
`SELECT * FROM Users
WHERE user_id=${args[1]}`
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
    +"\n"+style+" money: $"+coins
    +"\n"+style+" style: "+style
    +"\n"+style+" bio: "+bio
    +"\n"+style+" commands: "+commands
    +"\n"+style+" userid: "+id
    +"\n"+style+" account created: "+finalTime1)

});
break;
// profile ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    +"\n"+style+" money: $"+coins
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
    set("style", value)
    reply(value+" style has been updated")
break;
// set username ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "username":
if (!isRegister) return reply(registerMessage)
if (args.length<2) return reply(style+" please enter a username")
if (args.length>200) return reply(style+" to long")
    set("username", args[1])
    reply(value+" username has been updated")
break;
// set bio ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "bio":
if (!isRegister) return reply(registerMessage)
if (args.length<2) return reply(style+" please enter a biography")
    set("bio", value)
    reply(style+" bio has been updated")
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
                    if (position == 1) {
                        leaderboard+="\n 🥇 "+position+". "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)+" "+JSON.stringify(item.messages)+" commands"
                    } else if (position == 2) {
                        leaderboard+="\n 🥈 "+position+". "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)+" "+JSON.stringify(item.messages)+" commands"
                    } else if (position == 3) {
                        leaderboard+="\n 🥉 "+position+". "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)+" "+JSON.stringify(item.messages)+" commands"
                    } else {
                     leaderboard+="\n "+position+". "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)+" "+JSON.stringify(item.messages)+" commands"
                    }
                }
                    
         reply(leaderboard.replace(/["]+/g, ''));
        }
    });
break;


//-- truth
case 'truth':				
if (!isRegister) return reply(registerMessage)
  const truth = _truth[Math.floor(Math.random() * _truth.length)]
  reply(`${style} 𝑌𝑜𝑢𝑟 𝑡𝑟𝑢𝑡ℎ\n- - - - - - - - - - - - - - - - - -\n${truth}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
break
//-- Tod dare
case 'dare':
    if (!isRegister) return reply(registerMessage)
  const dare = _dare[Math.floor(Math.random() * _dare.length)]
  reply(`${style} 𝑌𝑜𝑢𝑟 𝑑𝑎𝑟𝑒\n- - - - - - - - - - - - - - - - - -\n${dare}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
break
//-- Facts
case 'fact':
    if (!isRegister) return reply(registerMessage)
  const fact = _facts[Math.floor(Math.random() * _facts.length)]
  reply(`${style} 𝑌𝑜𝑢𝑟 𝑓𝑎𝑐𝑡\n- - - - - - - - - - - - - - - - - -\n${fact}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
break
//-- pokemon
case 'pokemon':
    if (!isRegister) return reply(registerMessage)
  const pokemon = _pokemon[Math.floor(Math.random() * _pokemon.length)]
  reply(`${style} 𝑌𝑜𝑢𝑟 𝑃𝑜𝑘𝑒𝑚𝑜𝑛\n- - - - - - - - - - - - - - - - - -\n${pokemon}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
break
//-- animal
case 'animal':
    if (!isRegister) return reply(registerMessage)
  const animal = _animal[Math.floor(Math.random() * _animal.length)]
  reply(`${style} 𝑌𝑜𝑢𝑟 𝑎𝑛𝑖𝑚𝑎𝑙\n- - - - - - - - - - - - - - - - - -\n${animal}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
break
case 'gay':
case 'gaymeter':
    if (!isRegister) return reply(registerMessage)
  if (args.length > 0) {
  const gay = _gay[Math.floor(Math.random() * _gay.length)]
  reply(`𓂸 𝑇ℎ𝑖𝑠 𝑝𝑒𝑟𝑠𝑜𝑛 𝑖𝑠 ${gay}% 𝑔𝑎𝑦.`)
  }
  else { 
	const gay = _gay[Math.floor(Math.random() * _gay.length)]
	  reply(`𓂸 𝑌𝑜𝑢𝑟 𝑎𝑟𝑒 ${gay}% 𝑔𝑎𝑦.`)
  }
break
//-- love
case 'love':
    if (!isRegister) return reply(registerMessage)
	  if (args.length < 2) return reply(`${style} 𝑃𝑙𝑒𝑎𝑠𝑒 𝑎𝑑𝑑 𝑡𝑤𝑜 𝑛𝑎𝑚𝑒 𝑡𝑜 𝑓𝑖𝑛𝑑 𝑜𝑢𝑡 𝑡ℎ𝑒𝑖𝑟 𝑙𝑜𝑣𝑒.`)		  
  const love = _love[Math.floor(Math.random() * _love.length)]
  reply(`${love}`)
break
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
                        user+="\n "+JSON.stringify(item.style)+" "+JSON.stringify(item.username)+" ID: "+JSON.stringify(item.user_id)
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
case "sticker":
    if (!isRegister) return reply(registerMessage)
    if (!isQuote) return reply("please quote a media")

    if (args.length > 1) {
        sticker(args[1])
    } else {
        sticker("StarDash")
    }
    async function sticker(name){
        try {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
        const encmedia = await quotedMsg.downloadMedia();
        client.sendMessage(msg.from, encmedia, { quotedMessageId: msg.id._serialized, sendMediaAsSticker: true, stickerName: name, stickerAuthor: username, stickerCategories: ['😎','😾','🗿'] })
        } else {
            reply(style+" reply to a picture")
        }
    } catch (err){
        reply(style+" there was an error lol cryptic details:\n\n\n"+err.message)
    }
    }


break;
case "search":
if (!isRegister) return reply(registerMessage)
if (args.length < 2) return reply(`${style} Please enter search name`)

search()
async function search() {
    var yt = require('youtube-search-without-api-key');
    var videos = await yt.search(`${value}`);
    var results = "found "+videos.length+" results";

    for (const item of videos.values()) {  
        results+="\n\n"+style+" "
        +JSON.stringify(item.title)+"\n💎 "
        +JSON.stringify(item.duration_raw)+"\n📦 "
        +JSON.stringify(item.snippet.publishedAt)+"\n📡"
        +JSON.stringify(item.url)
    }
    reply(results.replace(/["]+/g, ''));
}

break;
case "img": // https://wwebjs.dev/guide/handling-attachments.html#sending-media

    async function sendMedia(link,number,text) {
        const mediaLink = await MessageMedia.fromUrl(link); // await MessageMedia.fromFilePath('./image.png');
        client.sendMessage(number, mediaLink, {caption: text}).then(function(res){}).catch(function(err){});
    }
    sendMedia('https://stihi.ru/pics/2014/06/08/4002.jpg', msg.from, 'Hi').then(function (){});
break;
case "song": 
if (!isRegister) return reply(registerMessage)
if (args.length < 2) return reply(`${style} Please enter song name`)	

var getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};

	
songData()
async function songData() {


var yt = require('youtube-search-without-api-key');
var videos = await yt.search(`${value}`);

reply(
`${style} _${videos[0].title}_
💎 _${videos[0].duration_raw}_ min`)
}

try {
ran= getRandom('.opus')
exec(`yt-dlp -x --audio-format opus -o, --output ${ran} "ytsearch:${value}"`, (err) => {
                                    
        if (err) return reply(`${style} Error\n\n\n`+err.message)
        
        sendMediaAudio(ran,msg.from, style+' Heres your song').then(function (){});

        async function sendMediaAudio(path,number,text) {
            try {
            const Audio = await MessageMedia.fromFilePath(path); 
            client.sendMessage(number, Audio, {caption: text, sendAudioAsVoice: true}).then(function(res){}).catch(function(err){});

            } catch (err) {
                reply("error \n\n"+err.message)
            }
        }
    })	

} catch (err) {
    reply("error\n\n"+err.message)
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
