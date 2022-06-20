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

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { executablePath: '/usr/bin/google-chrome-stable', headless: false }
});


mysql = require('mysql');
const { exec } = require('child_process');
const { read } = require('fs');
const { title } = require('process');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'johannw2004',
    database: 'db_bot',
    charset: 'utf8mb4'
});
connection.connect();


client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});

/*client.on('qr', qr => {
   qrcode.generate(qr, {small: true});
});*/


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

client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); // message after it was deleted.
    if (before) {
        console.log(before); // message before it was deleted.
    }
});

client.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log(msg.body); // message before it was deleted.
});


client.on('message', async msg => {

    var isGroup = false;
    var isAntilink = false;
    if (msg.from.includes("@g.us")) {
        isGroup = true;

        connection.query( // get the users stuff
        `SELECT * FROM Antilink WHERE group_id="${msg.from.split("-")[1]}"`
        , function (error, results, fields) {
            if (error) console.log(error.message);
            var anti = JSON.parse(JSON.stringify(results))

            try {
                isAntilink = anti[0].active
                isAntilink = true;

                if (msg.body.includes("http")) {
                    kickAnti(msg, number)
                    async function kickAnti(msg, number) {
                        let chat = await msg.getChat()
                        let users = number.replace(/[^0-9]/g, '') + "@c.us"
                        for (let user of users) chat.removeParticipants([user]).then((res) => {
                            msg.reply(res)
                        }).catch((err) => {
                            msg.reply(err)
                        })

                        reply("kicked due to antilink")
                    }
                }


            } catch (err) {
                isAntilink = false;
            }
        });
    }

    console.log(msg)

    var number;
    if (msg.author == "undefined") {
        number = msg.from
    } else if (msg.author == undefined) {
        number = msg.from
    } else {
        number = msg.author
    }



    var isCommand = false;
    try {
        if (msg.body.split("")[0] == ".") {
            isCommand = true
        }
    } catch (err) {

    }

    var yourDate = new Date()
    var dd = yourDate.toISOString().split('T')[0]

    codeM()
    async function codeM() {
        const codeM = await client.getCountryCode(number)

        if (msg.body.includes("mylast")) {

        } else {
            connection.query( // save message
                `INSERT INTO Messages (number, clearnumber, pushname, message, type, hasMedia, timestamp, deviceType, hasQuotedMsg, isGif, isForwarded, isCommand, date, country_code) 
        VALUES ("${number}","${number.split("@")[0]}","${msg._data.notifyName}","${msg.body}","${msg.type}","${msg.hasMedia}",${msg.timestamp},"${msg.deviceType}","${msg.hasQuotedMsg}","${msg.isGif}","${msg.isForwarded}","${isCommand}","${dd}","${codeM}")`
                , function (error, results, fields) {
                    if (error) console.log(error.message)
                });
        }
    }


    const dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
    const registerMessage = "you are not registered. To register send the message:\n\n.register"
    const groupMessage = "this command is only for groups"
    const vipMessage = "this command is only for vip users"
    const ownerMessage = "this command is only for the owner"
    var isRegister = false;
    var isQuote = msg.hasQuotedMsg
    var pushname = msg._data.notifyName

    var value = removeFirstWord(msg.body)
    var args = msg.body.split(" ")
    var switchMsg;
    if (msg.body.split("")[1] == " ") {
        var value = removeFirstWord(msg.body)

        var sub = removeFirstWord(msg.body.slice(2))
        var args = sub.split(" ")
        switchMsg = msg.body.slice(2).split(" ")[0]
    } else {
        switchMsg = msg.body.slice(1).split(" ")[0]
    }

    codePref()
    async function codePref() {
        const codePref = await client.getCountryCode(number)
        if (codePref.includes("91")) {
            msg.body = "banned"
        }
    }
    if (msg.body.split("")[0] == "." || msg.body.split("")[0] == "#" || msg.body.split("")[0] == "$" || msg.body.split("")[0] == "!") {
        // register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        connection.query(
            `SELECT COUNT(*) AS RowCount FROM Users WHERE number='${number}'`
            , function (error, results1, fields) {
                if (error) throw error;
                console.log(results1[0].RowCount)

                if (Number(results1[0].RowCount) < 1) {
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
                } catch (err) { }
                try {
                    var username;
                    username = res[0].username
                } catch (err) { }
                try {
                    var xp;
                    xp = res[0].xp
                } catch (err) { }
                try {
                    var coins;
                    coins = res[0].coins
                } catch (err) { }
                try {
                    var bio;
                    bio = res[0].bio
                } catch (err) { }
                try {
                    var date;
                    date = res[0].date
                } catch (err) { }
                try {
                    var commands;
                    commands = res[0].messages
                } catch (err) { }
                try {
                    var id;
                    id = res[0].user_id
                } catch (err) { }
                var last_claim;
                try {
                    last_claim = res[0].last_claim
                } catch (err) { }
                var status;
                try {
                    status = res[0].status
                } catch (err) { }
                var clearnumber;
                try {
                    clearnumber = res[0].clearnumber
                } catch (err) { }
                var deviceType;
                try {
                    deviceType = res[0].deviceType
                } catch (err) { }

                var country_code;
                try {
                    country_code = res[0].country_code
                } catch (err) { }
                //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                var isNormal = false;
                var isVip = false;
                var isOwner = false;

                if (status == "normal") {
                    isNormal = true;
                } else if (status == "vip") {
                    isNormal = true;
                    isVip = true;
                } else if (status == "owner") {
                    isNormal = true;
                    isVip = true;
                    isOwner = true;
                } else if (status == "banned") {

                }

                if (isRegister) {
                    connection.query(
                        `UPDATE Users
        SET messages = messages + 1
        WHERE number='${number}'`
                        , function (error, results, fields) {
                            if (error) console.log(error.message);
                        });

                    console.log("message: " + msg.body + " from user " + number)

                }
                if (deviceType == "unknown") {
                    set("clearnumber", number.split("@")[0])
                    set("deviceType", msg.deviceType)
                }

                switch (switchMsg) {
                    // cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "bot":
                        if (!isRegister) return reply(registerMessage);
                        reply(style + ' Hai ' + username);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "echo":
                        if (!isRegister) return reply(registerMessage);
                        if (args.length < 2) return reply(style + "enter a message Example:  .echo hi")
                        client.sendMessage(msg.from, value);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "menu":
                        if (!isRegister) return reply(registerMessage);
                        var yourDate = new Date()
                        var claim;
                        if (last_claim == yourDate.toISOString().split('T')[0]) {
                            claim = "already claimed"
                        } else {
                            claim = ".claim"
                        }

                        var level0 = Number(xp) / 100 + 1
                        var level = level0 + "."
                        reply(
                    // Menus ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                            `𝑀𝑒𝑛𝑢 ☁️
- - - - - - - - - - - - - - - - - -  
⌖ ${username} 
⌖ level ${level.split(".")[0]} 
⌖ ${xp} XP
- - - - - - - - - - - - - - - - - - 
${style} .games
${style} .media
${style} .www
${style} .settings
${style} .database
- - - - - - - - - - - - - - - - - - 
${style} .bot
${style} .me
${style} .transfer
${style} .leaderboard
${style} .support
${style} ${claim}
- - - - - - - - - - - - - - - - - -  
𝑌𝑜𝑢𝑟 𝑀𝑜𝑛𝑒𝑦 ⌖ _${coins}$_`);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "support":
                    case "suport":
                    case "help":
                        if (!isRegister) return reply(registerMessage);
                        reply(style + ` Support Group
- - - - - - - - - - - - - - - - - -     
https://chat.whatsapp.com/I09F6RruESk0XimB12YlDF
- - - - - - - - - - - - - - - - - - `)
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "settings":
                        if (!isRegister) return reply(registerMessage);
                        var level0 = Number(xp) / 100 + 1
                        var level = level0 + "."
                        reply(

                            `𝑆𝑒𝑡𝑡𝑖𝑛𝑔𝑠 ☁️
- - - - - - - - - - - - - - - - - -  
⌖ ${username} 
⌖ level ${level.split(".")[0]} 
⌖ ${xp} XP
- - - - - - - - - - - - - - - - - - 
${style} .style
${style} .username
${style} .bio
- - - - - - - - - - - - - - - - - -  
𝑌𝑜𝑢𝑟 𝑀𝑜𝑛𝑒𝑦 ⌖ _${coins}$_`);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "www":
                        if (!isRegister) return reply(registerMessage);
                        var level0 = Number(xp) / 100 + 1
                        var level = level0 + "."
                        reply(

                            `𝑊𝑤𝑤 ☁️
- - - - - - - - - - - - - - - - - -  
⌖ ${username} 
⌖ level ${level.split(".")[0]} 
⌖ ${xp} XP
- - - - - - - - - - - - - - - - - - 
${style} .search
${style} .wiki
${style} .weather new york
- - - - - - - - - - - - - - - - - -  
𝑌𝑜𝑢𝑟 𝑀𝑜𝑛𝑒𝑦 ⌖ _${coins}$_`);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "database":
                        if (!isRegister) return reply(registerMessage);
                        var level0 = Number(xp) / 100 + 1
                        var level = level0 + "."
                        reply(

                            `𝐷𝑎𝑡𝑎𝑏𝑎𝑠𝑒 ☁️
- - - - - - - - - - - - - - - - - -  
⌖ ${username} 
⌖ level ${level.split(".")[0]} 
⌖ ${xp} XP
- - - - - - - - - - - - - - - - - - 
${style} .user @anyone
${style} .users
${style} .stardash
${style} .mylast
${style} .message
- - - - - - - - - - - - - - - - - -  
𝑌𝑜𝑢𝑟 𝑀𝑜𝑛𝑒𝑦 ⌖ _${coins}$_`);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "media":
                        if (!isRegister) return reply(registerMessage);
                        var level0 = Number(xp) / 100 + 1
                        var level = level0 + "."
                        reply(

                            `𝑀𝑒𝑑𝑖𝑎 ☁️
- - - - - - - - - - - - - - - - - -  
⌖ ${username} 
⌖ level ${level.split(".")[0]} 
⌖ ${xp} XP
- - - - - - - - - - - - - - - - - - 
${style} .song
${style} .wiki
${style} .sticker
${style} .resend
${style} .echo
${style} .delete
- - - - - - - - - - - - - - - - - -  
𝑌𝑜𝑢𝑟 𝑀𝑜𝑛𝑒𝑦 ⌖ _${coins}$_`);
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "games":
                        if (!isRegister) return reply(registerMessage);
                        var level0 = Number(xp) / 100 + 1
                        var level = level0 + "."
                        reply(

                            `𝐺𝑎𝑚𝑒𝑠 ☁️
- - - - - - - - - - - - - - - - - -  
⌖ ${username} 
⌖ level ${level.split(".")[0]} 
⌖ ${xp} XP
- - - - - - - - - - - - - - - - - - 
${style} .pokemon
${style} .fact
${style} .gay
${style} .love
${style} .slot
${style} .truth
${style} .dare
${style} .animal
${style} .leaderboard
- - - - - - - - - - - - - - - - - -  
𝑌𝑜𝑢𝑟 𝑀𝑜𝑛𝑒𝑦 ⌖ _${coins}$_`);
                        break;
                    // delete ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "delete":
                        if (!isRegister) return reply(registerMessage);

                        deleteMsg(msg, style)
                        async function deleteMsg(msg, style) {

                            try {
                                const quotedMsg = await msg.getQuotedMessage();
                                if (msg.hasQuotedMsg) {
                                    if (quotedMsg.fromMe) {
                                        quotedMsg.delete(true);
                                    } else {
                                        reply(style + ' I can only delete my own messages');
                                    }
                                }
                            } catch (err) {
                                reply(style + " There was an error. Cryptic error message:\n\n" + err.message)
                            }
                        }
                        break;
                    // wiki ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'wiki':
                    case 'whatis':
                        if (!isRegister) return reply(registerMessage);
                        if (args.length < 2) {
                            reply(style + ` please enter a search title`)
                        }
                        else {
                            try {
                                wiki = require('./_tools/wikiped');
                                wiki.getWikipedia(value, style, (wikilink) => {
                                    reply(wikilink)
                                })

                            } catch (err) {
                                reply(style + " There was an error. Cryptic error message:\n\n" + err.message)
                            }
                        }
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'send':
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 1) return reply(`${style} 𝑊ℎ𝑎𝑡 𝑖𝑠 𝑡ℎ𝑒 𝑝𝑖𝑐𝑡𝑢𝑟𝑒 𝑡𝑖𝑡𝑙𝑒?`)

                        reply(`${style} 𝐷𝑜𝑤𝑛𝑙𝑜𝑎𝑑𝑖𝑛𝑔...\n- - - - - - - - - - - - - - - - - -\n❇️ 𝐸𝑓𝑓𝑒𝑐𝑡𝑠`)
                        exec(`npx ddg-bulk-image-downloader -q "${value} jpg" -l 1 -o downloaded_images`, (err) => {
                            if (err) return reply(`${style} 𝐸𝑟𝑟𝑜𝑟\n\n` + err.message)
                            fs.readdir("./downloaded_images/", (err, files) => {
                                files.forEach(file => {
                                    console.log(file);
                                    sendD(msg.from, `${style} 𝑆𝑒𝑛𝑑𝑖𝑛𝑔 𝑓𝑜𝑟 ${username}...\n- - - - - - - - - - - - - - - - - -\n✅ 𝑃𝑖𝑐𝑡𝑢𝑟𝑒𝑠`).then(function () { }, "./downloaded_images/" + file);

                                });
                            });


                            async function sendD(number, text, pathF) {
                                try {
                                    const mediaLink = await MessageMedia.fromFilePath(pathF);
                                    client.sendMessage(number, mediaLink, { caption: text }).then(function (res) { }).catch(function (err) { });
                                } catch (err) {
                                    reply(style + " there was an error\n\n" + err.message)
                                }
                            }

                        })

                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'weather':
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 1) return reply(`${design} 𝑃𝑙𝑒𝑎𝑠𝑒 𝑎𝑑𝑑 𝑎 𝑐𝑖𝑡𝑦 𝑎𝑛𝑑 𝑐𝑜𝑢𝑛𝑡𝑟𝑦𝑛𝑎𝑚𝑒`)

                        var weather = require('weather-js');
                        // Options:
                        // search:     location name or zipcode
                        // degreeType: F or C

                        try {
                            weather.find({ search: `${value}`, degreeType: 'c' }, function (err, result) {
                                if (err) console.log(err);

                                try {
                                    var cityName = result[0].location.name
                                    var temperature = result[0].current.temperature
                                    var skytext = result[0].current.skytext
                                    var winddisplay = result[0].current.winddisplay
                                    var imageurl = result[0].current.imageUrl

                                    if (Number(temperature) < Number(6)) {
                                        var tempSymbol = "❄️"
                                    }
                                    else if (Number(temperature) < Number(10)) {
                                        var tempSymbol = "☁️"
                                    }
                                    else if (Number(temperature) < Number(15)) {
                                        var tempSymbol = "🌤️"
                                    }
                                    else if (Number(temperature) < Number(25)) {
                                        var tempSymbol = "☀️"
                                    }
                                    else {
                                        var tempSymbol = "🔥"
                                    }
                                    reply(`${style} 𝑊𝑒𝑎𝑡ℎ𝑒𝑟
- - - - - - - - - - - - - - - - - -
📍 𝐿𝑜𝑐𝑎𝑡𝑖𝑜𝑛 ⌖ ${cityName} 
${tempSymbol} 𝑇𝑒𝑚𝑝𝑒𝑟𝑎𝑡𝑢𝑟𝑒 ⌖ ${temperature}°C
🔮 𝑆𝑘𝑦 ⌖ ${skytext}
🧭 𝑊𝑖𝑛𝑑 ⌖ ${winddisplay}
- - - - - - - - - - - - - - - - - -`);
                                } catch (err) {
                                    reply(style + " unknkown location? Error message:\n\n" + err.message)
                                }



                            });

                        } catch (err) {
                            reply(style + " unknkown location? Error message:\n\n" + err.message)
                        }

                        break

                    case "button":
                        let button = new Buttons('Button body', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer');
                        client.sendMessage(msg.from, button);
                        break;
                    case "list":
                        let sections = [{ title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }];
                        let list = new List('List body', 'btnText', sections, 'Title', 'footer');
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

                        if (winAmount < 0) {
                            looseorwin = "lost"
                        } else {
                            looseorwin = "won"
                        }

                        connection.query(
                            `UPDATE Users
        SET coins = "${coins + winAmount}", xp = xp + 2
        WHERE number='${number}'`
                            , function (error, results, fields) {
                                if (error) console.log(error.message);
                            });

                        reply(style + ` 𝚂𝚕𝚘𝚝

${slot4}${slot5}${slot6}
- - - - - - - - - \n${slot1}${slot2}${slot3} ☜︎ ${winmsg} ♕︎
- - - - - - - - - \n${slot7}${slot8}${slot9}

you ${looseorwin} ${winAmount}$!
you have $${coins + winAmount} left!
... gained xp!`)

                        break;

                    // claim ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "claim":
                        if (!isRegister) return reply(registerMessage)

                        var yourDate = new Date()
                        if (last_claim == yourDate.toISOString().split('T')[0]) return reply(style + " already claimed today")

                        connection.query(
                            `UPDATE Users
    SET coins = coins + 25, xp = xp + 10, last_claim = "${yourDate.toISOString().split('T')[0]}"
    WHERE number='${number}'`
                            , function (error, results, fields) {
                                if (error) console.log(error.message);
                            });

                        reply(style + " claimed 25$")
                        break;
                    // transfer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "transfer":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 3) return reply("please send id of target and enter amount. Example: .transfer 50 1\n in this example 50 is the amount and 1 the id")
                        if (Number(args[1]) < 1 || Number(args[1]) == NaN) return reply(style + " please enter a valid amount")
                        if (Number(args[1]) < Number(coins)) return reply(style + " you dont have enough money for thistransaction")

                        var amount = args[1]

                        connection.query(
                            `UPDATE Users
    SET coins = coins - ${amount}
    WHERE number='${number}'`
                            , function (error, results, fields) {
                                if (error) {
                                    console.log(error.message);
                                    reply(style + " there was an error transfering your money+\n\n" + error.message)
                                } else {
                                    connection.query(
                                        `UPDATE Users
                SET coins = coins + ${amount}
                WHERE user_id=${args[2]}`
                                        , function (error, results, fields) {

                                            if (error) {
                                                console.log(error.message);
                                                reply(style + " there was an error with the account you targeted. cancelling the transfer+\n\n" + error.message)

                                                connection.query(
                                                    `UPDATE Users
                            SET coins = coins + ${amount}
                            WHERE number='${number}'`
                                                    , function (error, results, fields) {

                                                    });

                                            } else {
                                                var urNEw = Number(coins) - Number(amount)
                                                reply(style + " successfully transfered " + amount + "$ to user with id " + args[2] + " you now have " + urNEw + "$ left")
                                            }
                                        });
                                }
                            });

                        break;
                    // register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "register":
                        if (isRegister) return reply(style + " you are already registered")


                        codeZ()
                        async function codeZ() {
                            const codeZ = await client.getCountryCode(number)

                            connection.query( // register userstuff
                                `INSERT INTO Users (username, number, date, coins, xp, style, age, bio, messages, deviceType, clearnumber, country_code) 
    VALUES ("${pushname}","${number}","${dateInSec}",100,0,"⛓️",0,"hey its me", 0, "${msg.deviceType}","${number.split("@")[0]}","${codeZ}")`
                                , function (error, results, fields) {
                                    if (error) reply("there was error with registration\n\n" + error.message);
                                    console.log('Yey a new registration! >_< ');
                                    reply("registration successfull " + pushname + "\n\nall commands: .menu\nyour profile: .me")
                                });
                        }
                        break;
                        // Antilink ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        case "antilink":
                            if (!isRegister) return reply(registerMessage)
                            if (!isGroup) return reply(groupMessage)
                            if (!isVip) return reply(vipMessage)

                            if (isAntilink) {
                                connection.query( 
                                    `DELETE FROM Antilink WHERE group_id="${msg.from.split("-")[1]}"`
                                    , function (error, results, fields) {
                                        if (error) reply("there was error\n\n" + error.message);
                                        reply(style+" antilink deactivated")
                                });
                            } else {
                            connection.query( 
                                `INSERT INTO Antilink (group_id, timestamp, active) 
                                VALUES ("${msg.from.split("-")[1]}",${dateInSec},"true")`
                                , function (error, results, fields) {
                                    if (error) reply("there was error\n\n" + error.message);
                                    reply(style+" antilink activated")
                            });
                           }
                        break;
                    // account ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "user":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply("enter the users id or tag user")
                        if (args.length > 2) return reply("please use .user id or .user @user")

                        var searchQ = `SELECT * FROM Users
WHERE user_id=${args[1]}`
                        if (args[1].includes("@")) {
                            searchQ = `SELECT * FROM Users
 WHERE number="${value.split("@")[1]}@c.us"`

                        }
                        connection.query( // get the users stuff
                            searchQ
                            , function (error, results, fields) {
                                if (error) reply(error.message);
                                var res = JSON.parse(JSON.stringify(results))

                                //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                var style;
                                try {
                                    style = res[0].style
                                } catch (err) { }
                                try {
                                    var username;
                                    username = res[0].username
                                } catch (err) { }
                                try {
                                    var xp;
                                    xp = res[0].xp
                                } catch (err) { }
                                try {
                                    var coins;
                                    coins = res[0].coins
                                } catch (err) { }
                                try {
                                    var bio;
                                    bio = res[0].bio
                                } catch (err) { }
                                try {
                                    var date;
                                    date = res[0].date
                                } catch (err) { }
                                try {
                                    var commands;
                                    commands = res[0].messages
                                } catch (err) { }
                                try {
                                    var id;
                                    id = res[0].user_id
                                } catch (err) { }
                                try {
                                    var status;
                                    status = res[0].status
                                } catch (err) { }
                                try {
                                    var deviceType;
                                    deviceType = res[0].deviceType
                                } catch (err) { }
                                try {
                                    var country_code;
                                    country_code = res[0].country_code
                                } catch (err) { }
                                try {
                                    var clearnumber;
                                    clearnumber = res[0].clearnumber
                                } catch (err) { }
                                //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                var finalTime;
                                var time = (dateInSec - Number(date))

                                if (time / 60 / 60 / 24 > 364) {
                                    finalTime = time / 60 / 60 / 24 / 365 + ". year(s) ago"
                                } else if (time / 60 / 60 / 24 > 30) {
                                    finalTime = time / 60 / 60 / 24 / 30 + ". month(s) ago"
                                } else if (time / 60 / 60 / 24 > 1) {
                                    finalTime = time / 60 / 60 / 24 + ". day(s) ago"
                                } else if (time / 60 / 60 > 1) {
                                    finalTime = time / 60 / 60 + ". hour(s) ago"
                                } else if (time / 60 > 1) {
                                    finalTime = time / 60 + ". minute(s) ago"
                                } else {
                                    finalTime = time + ".. second(s) ago"
                                }
                                var finalTime1 = finalTime.split(".")[0] + " " + finalTime.split(" ")[1] + " ago"


                                reply(style + " username: " + username
                                    + "\n💎 xp: " + xp
                                    + "\n💵 money: $" + coins
                                    + "\n💿 style: " + style
                                    + "\n📋 bio: " + bio
                                    + "\n📊 commands: " + commands
                                    + "\n💳 userid: " + id
                                    + "\n🗂️ status: " + status
                                    + "\n📱 device: " + deviceType
                                    + "\n📟 number: " + clearnumber
                                    + "\n⚙️ code: " + country_code
                                    + "\n🗓️ account created: " + finalTime1)

                            });
                        break;
                    // profile ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "me":
                        if (!isRegister) return reply(registerMessage)

                        var finalTime;
                        var time = (dateInSec - Number(date))

                        if (time / 60 / 60 / 24 > 364) {
                            finalTime = time / 60 / 60 / 24 / 365 + ". year(s) ago"
                        } else if (time / 60 / 60 / 24 > 30) {
                            finalTime = time / 60 / 60 / 24 / 30 + ". month(s) ago"
                        } else if (time / 60 / 60 / 24 > 1) {
                            finalTime = time / 60 / 60 / 24 + ". day(s) ago"
                        } else if (time / 60 / 60 > 1) {
                            finalTime = time / 60 / 60 + ". hour(s) ago"
                        } else if (time / 60 > 1) {
                            finalTime = time / 60 + ". minute(s) ago"
                        } else {
                            finalTime = time + ".. second(s) ago"
                        }
                        var finalTime1 = finalTime.split(".")[0] + " " + finalTime.split(" ")[1] + " ago"

                        reply(style + " username: " + username
                            + "\n💎 xp: " + xp
                            + "\n💵 money: $" + coins
                            + "\n💿 style: " + style
                            + "\n📋 bio: " + bio
                            + "\n📊 commands: " + commands
                            + "\n☎️ number: +" + number.split("@")[0]
                            + "\n💳 userid: " + id
                            + "\n🗂️ status: " + status
                            + "\n📱 device: " + deviceType
                            + "\n🗓️ account created: " + finalTime1)
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "stardash":
                        connection.query(
                            `SELECT COUNT(*) AS RowCount FROM Messages`
                            , function (error, results, fields) {
                                if (error) {
                                    reply(style + " error\n\n" + error.message)
                                }

                                console.log(results[0].RowCount)
                                var messages = results[0].RowCount

                                connection.query(
                                    `SELECT COUNT(*) AS RowCount FROM Messages WHERE isCommand='true'`
                                    , function (error, results, fields) {
                                        console.log(results[0].RowCount)
                                        var command = results[0].RowCount

                                        connection.query(
                                            `SELECT COUNT(*) AS RowCount FROM Messages WHERE deviceType='android'`
                                            , function (error, results, fields) {

                                                console.log(results[0].RowCount)
                                                var android = results[0].RowCount
                                                var ios = Number(messages) - Number(android)

                                                connection.query(
                                                    `SELECT COUNT(*) AS RowCount FROM Messages WHERE hasQuotedMsg='true'`
                                                    , function (error, results, fields) {

                                                        console.log(results[0].RowCount)
                                                        var quoted = results[0].RowCount

                                                        connection.query(
                                                            `SELECT COUNT(*) AS RowCount FROM Messages WHERE hasMedia='true'`
                                                            , function (error, results, fields) {

                                                                console.log(results[0].RowCount)
                                                                var media = results[0].RowCount

                                                                connection.query(
                                                                    `SELECT COUNT(*) AS RowCount FROM Messages WHERE number='${number.split("@")[0]}@c.us'`
                                                                    , function (error, results, fields) {

                                                                        console.log(results[0].RowCount)
                                                                        console.log(results[0].RowCount)
                                                                        var you = results[0].RowCount

                                                                        connection.query(
                                                                            `SELECT COUNT(*) AS RowCount FROM Messages WHERE type='chat'`
                                                                            , function (error, results, fields) {

                                                                                console.log(results[0].RowCount)
                                                                                var chat = results[0].RowCount

                                                                                connection.query(
                                                                                    `SELECT COUNT(*) AS RowCount FROM Messages WHERE type='sticker'`
                                                                                    , function (error, results, fields) {

                                                                                        console.log(results[0].RowCount)
                                                                                        var sticker = results[0].RowCount

                                                                                        connection.query(
                                                                                            `SELECT COUNT(*) AS RowCount FROM Messages WHERE type='image'`
                                                                                            , function (error, results, fields) {

                                                                                                console.log(results[0].RowCount)
                                                                                                var image = results[0].RowCount

                                                                                                connection.query(
                                                                                                    `SELECT DISTINCT(country_code) FROM Messages;`
                                                                                                    , function (error, results, fields) {
                                                                                                        var arr = JSON.parse(JSON.stringify(results))
                                                                                                        var different = arr.length
                                                                                                        var text = "\n🌎 from " + different + " countries";


                                                                                                        var itemsProcessed = 0;
                                                                                                        arr.forEach((item, index, array) => {


                                                                                                            itemsProcessed++;
                                                                                                            connection.query(
                                                                                                                `SELECT COUNT(*) AS RowCount FROM Messages WHERE country_code='${item.country_code}'`
                                                                                                                , function (error, results, fields) {

                                                                                                                    var amount = results[0].RowCount



                                                                                                                    text += "\n🪐 +" + JSON.stringify(item.country_code) + " (" + amount + ")"
                                                                                                                });
                                                                                                            if (itemsProcessed === array.length) {
                                                                                                                callback();
                                                                                                            }

                                                                                                        });


                                                                                                        function callback() {
                                                                                                            console.log('all done');
                                                                                                            connection.query(

                                                                                                                `SELECT COUNT(*) AS RowCount FROM Users WHERE user_id > 0`
                                                                                                                , function (error, results, fields) {

                                                                                                                    console.log(results[0].RowCount)
                                                                                                                    var registered = results[0].RowCount

                                                                                                                    var receivedNumber = Number(messages)

                                                                                                                    var commandPercentage = Number(command) / receivedNumber * 100
                                                                                                                    var quotedPercentage = Number(quoted) / receivedNumber * 100
                                                                                                                    var mediaPercentage = Number(media) / receivedNumber * 100
                                                                                                                    var chatPercentage = Number(chat) / receivedNumber * 100
                                                                                                                    var stickerPercentage = Number(sticker) / receivedNumber * 100
                                                                                                                    var imagePercentage = Number(image) / receivedNumber * 100
                                                                                                                    var androidPercentage = Number(android) / receivedNumber * 100
                                                                                                                    var iosPercentage = Number(ios) / receivedNumber * 100
                                                                                                                    var youPercentage = Number(you) / receivedNumber * 100



                                                                                                                    reply("📡 StarDash Logs"
                                                                                                                        + "\n\n💭 all received: " + messages.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                                                                                                                        + "\n⚔️ commands: " + command.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + commandPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n📨 quotes: " + quoted.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + quotedPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n🎞️ media: " + media.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + mediaPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n💬 chat msg: " + chat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + chatPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n🌠 stickers: " + sticker.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + stickerPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n📸 images: " + image.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + imagePercentage.toFixed(2) + "%)"
                                                                                                                        + "\n🐺 android: " + android.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + androidPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n🐑 ios: " + ios.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + iosPercentage.toFixed(2) + "%)"
                                                                                                                        + "\n" + style + " from you: " + you.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " (" + youPercentage.toFixed(2) + "%)"
                                                                                                                        + text.replace(/["]+/g, '')
                                                                                                                        + "\n💫 users registered: " + registered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

                                                                                                                    )

                                                                                                                });
                                                                                                        }
                                                                                                    });
                                                                                            });
                                                                                    });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                        break;
                    // mylast ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "mylast":
                        connection.query( // get the users stuff
                            `SELECT * FROM Messages
WHERE number="${number}" ORDER BY timestamp DESC limit 1`
                            , function (error, results, fields) {
                                if (error) reply("error\n\n" + error.message);
                                var res = JSON.parse(JSON.stringify(results))

                                var itemsProcessed = 0;
                                var text = "🪐 your last message";
                                res.forEach((item, index, array) => {

                                    itemsProcessed++;
                                    text += "\n"
                                        + "\n💬 message: " + item.message
                                        + "\n💳 id: " + item.message_id
                                        + "\n☎️ number: " + item.number
                                        + "\n☎️ clear-number: " + item.clearnumber
                                        + "\npushname: " + item.pushname
                                        + "\n📷 type: " + item.type
                                        + "\n⏱️ time-in-ms: " + item.timestamp
                                        + "\n🗓️ date: " + item.date
                                        + "\n💽 has-media: " + item.hasMedia
                                        + "\n📱 device: " + item.deviceType
                                        + "\n🔭 has-quote: " + item.hasQuotedMsg
                                        + "\n🌠 is-gif: " + item.isGif
                                        + "\n📩 is-forwarded: " + item.isForwarded
                                        + "\n⚔️ is-command: " + item.isCommand
                                        + "\n📡 country-code: " + item.country_code

                                    if (itemsProcessed === array.length) {
                                        callback();
                                    }
                                });
                                function callback() {
                                    console.log('all done');
                                    reply(text)
                                }
                            });
                        break;
                    // message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "message":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply(style + " please enter a message you want to find out more about")

                        connection.query(
                            `SELECT COUNT(*) AS RowCount FROM Messages WHERE message='${value}'`
                            , function (error, results, fields) {

                                console.log(results[0].RowCount)
                                var amount = results[0].RowCount

                                connection.query(
                                    `SELECT COUNT(*) AS RowCount FROM Messages WHERE message='${value}' AND clearnumber='${number.split("@")[0]}'`
                                    , function (error, results, fields) {

                                        console.log(results[0].RowCount)
                                        var amountYou = results[0].RowCount

                                        reply(style + " _Details_"
                                            + `\n\nmessage: "` + value + `"\ntimes sent: ` + amount + "\ntimes sent by you: " + amountYou
                                        )
                                    });
                            });
                        break;
                    // set style ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "style":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply(style + " please enter a style")
                        set("style", value)
                        reply(value + " style has been updated")
                        break;
                    // set username ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "username":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply(style + " please enter a username\nExample .username trump")
                        if (args.length > 200) return reply(style + " to long")
                        set("username", args[1])
                        reply(value + " username has been updated")
                        break;
                    // set bio ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "bio":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply(style + " please enter a biography\nExample .bio i am english")
                        set("bio", value)
                        reply(style + " bio has been updated")
                        break;
                    // make vip ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "vip":
                        if (!isRegister) return reply(registerMessage)
                        if (!isOwner) return reply(ownerMessage)
                        if (args.length < 2) return reply(style + " please enter a user id")
                        connection.query(
                            `UPDATE Users
    SET status = "vip"
    WHERE user_id=${args[1]}`
                            , function (error, results, fields) {
                                if (error) reply(error.message);
                            });
                        reply(style + " the user with the id " + args[1] + " has been promoted to VIP!")
                        break;
                    // make vip ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "removevip":
                        if (!isRegister) return reply(registerMessage)
                        if (!isOwner) return reply(ownerMessage)
                        if (args.length < 2) return reply(style + " please enter a user id")
                        connection.query(
                            `UPDATE Users
    SET status = "normal"
    WHERE user_id=${args[1]}`
                            , function (error, results, fields) {
                                if (error) reply(error.message);
                            });
                        reply(style + " the user with the id " + args[1] + " has been demoted!")
                        break;

                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
                                async function leaderboard(res) {
                                    var leaderboard = style + "LEADERBOARD\n";
                                    var position = 0
                                    for (const item of res.values()) {
                                        position++
                                        if (position == 1) {
                                            leaderboard += "\n🥇 " + JSON.stringify(item.style) + " " + JSON.stringify(item.username) + " " + JSON.stringify(item.messages) + " commands"
                                        } else if (position == 2) {
                                            leaderboard += "\n🥈 " + JSON.stringify(item.style) + " " + JSON.stringify(item.username) + " " + JSON.stringify(item.messages) + " commands"
                                        } else if (position == 3) {
                                            leaderboard += "\n🥉 " + JSON.stringify(item.style) + " " + JSON.stringify(item.username) + " " + JSON.stringify(item.messages) + " commands\n"
                                        } else {
                                            leaderboard += "\n " + position + ". " + JSON.stringify(item.style) + " " + JSON.stringify(item.username) + " " + JSON.stringify(item.messages) + " commands"
                                        }
                                    }

                                    reply(leaderboard.replace(/["]+/g, ''));
                                }
                            });
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'truth':
                        if (!isRegister) return reply(registerMessage)
                        const truth = _truth[Math.floor(Math.random() * _truth.length)]
                        reply(`${style} 𝑌𝑜𝑢𝑟 𝑡𝑟𝑢𝑡ℎ\n- - - - - - - - - - - - - - - - - -\n${truth}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'dare':
                        if (!isRegister) return reply(registerMessage)
                        const dare = _dare[Math.floor(Math.random() * _dare.length)]
                        reply(`${style} 𝑌𝑜𝑢𝑟 𝑑𝑎𝑟𝑒\n- - - - - - - - - - - - - - - - - -\n${dare}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'fact':
                        if (!isRegister) return reply(registerMessage)
                        const fact = _facts[Math.floor(Math.random() * _facts.length)]
                        reply(`${style} 𝑌𝑜𝑢𝑟 𝑓𝑎𝑐𝑡\n- - - - - - - - - - - - - - - - - -\n${fact}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'pokemon':
                        if (!isRegister) return reply(registerMessage)
                        const pokemon = _pokemon[Math.floor(Math.random() * _pokemon.length)]
                        reply(`${style} 𝑌𝑜𝑢𝑟 𝑃𝑜𝑘𝑒𝑚𝑜𝑛\n- - - - - - - - - - - - - - - - - -\n${pokemon}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'animal':
                        if (!isRegister) return reply(registerMessage)
                        const animal = _animal[Math.floor(Math.random() * _animal.length)]
                        reply(`${style} 𝑌𝑜𝑢𝑟 𝑎𝑛𝑖𝑚𝑎𝑙\n- - - - - - - - - - - - - - - - - -\n${animal}\n- - - - - - - - - - - - - - - - - -\n✅ StarDash`)
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case 'love':
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply(`${style} 𝑃𝑙𝑒𝑎𝑠𝑒 𝑎𝑑𝑑 𝑡𝑤𝑜 𝑛𝑎𝑚𝑒 𝑡𝑜 𝑓𝑖𝑛𝑑 𝑜𝑢𝑡 𝑡ℎ𝑒𝑖𝑟 𝑙𝑜𝑣𝑒.`)
                        const love = _love[Math.floor(Math.random() * _love.length)]
                        reply(`${love}`)
                        break
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "users":
                        if (!isRegister) return reply(registerMessage)
                        connection.query(
                            `SELECT *
    FROM Users`
                            , function (error, results, fields) {
                                if (error) console.log(error.message);
                                users(JSON.parse(JSON.stringify(results)))

                                async function users(res) {
                                    var user = "";
                                    for (const item of res.values()) {
                                        user += "\n " + JSON.stringify(item.style) + " " + JSON.stringify(item.username) + " (" + JSON.stringify(item.deviceType) + ") ID: " + JSON.stringify(item.user_id)
                                    }
                                    reply(user.replace(/["]+/g, ''));
                                }
                            });
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "resend":
                    case "image":
                        if (!isRegister) return reply(registerMessage)
                        if (!isQuote) return reply(style + " please quote a media")


                        quote()
                        async function quote() {
                            try {
                                const quotedMsg = await msg.getQuotedMessage();
                                if (quotedMsg.hasMedia) {
                                    const attachmentData = await quotedMsg.downloadMedia();
                                    client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
                                }
                            } catch (err) {
                                reply(style + " there was an error. tag media.\n\n" + err.message)
                            }
                        }
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "kick":
                        if (!isRegister) return reply(registerMessage)
                        kick(msg, number)
                        async function kick(msg, number) {
                            let chat = await msg.getChat()
                            let users = msg.mentionedIds[0] ? msg.mentionedIds : msg.hasQuotedMsg ? [quoted.from] : [text.replace(/[^0-9]/g, '') + "@c.us"]
                            for (let user of users) chat.removeParticipants([user]).then((res) => {
                                msg.reply(res)
                            }).catch((err) => {
                                msg.reply(err)
                            })

                            reply("kicked")
                        }
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "group":
                        userL(msg, number)
                        async function userL(msg, number) {

                            let chat = await msg.getChat()
                            reply(chat.participants)

                        }
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "sticker":
                        if (!isRegister) return reply(registerMessage)
                        if (!isQuote) return reply("please quote a media")

                        if (args.length > 1) {
                            sticker(args[1])
                        } else {
                            sticker("StarDash")
                        }
                        async function sticker(name) {
                            try {
                                const quotedMsg = await msg.getQuotedMessage();
                                if (quotedMsg.hasMedia) {

                                    try {
                                        const encmedia = await quotedMsg.downloadMedia();
                                        client.sendMessage(msg.from, encmedia, { quotedMessageId: msg.id._serialized, sendMediaAsSticker: true, stickerName: name, stickerAuthor: username, stickerCategories: ['😎', '😾', '🗿'] })

                                    } catch (err) {
                                        reply(style + " there was an error lol cryptic details:\n\n\n" + err.message)
                                    }

                                } else {
                                    reply(style + " reply to a picture")
                                }
                            } catch (err) {
                                reply(style + " there was an error lol cryptic details:\n\n\n" + err.message)
                            }
                        }
                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "search":
                        if (!isRegister) return reply(registerMessage)
                        if (args.length < 2) return reply(`${style} Please enter search name`)

                        search()
                        async function search() {
                            var yt = require('youtube-search-without-api-key');
                            var videos = await yt.search(`${value}`);
                            var results = "found " + videos.length + " results";

                            for (const item of videos.values()) {
                                results += "\n\n" + style + " "
                                    + JSON.stringify(item.title) + "\n💎 "
                                    + JSON.stringify(item.duration_raw) + "\n📦 "
                                    + JSON.stringify(item.snippet.publishedAt) + "\n📡"
                                    + JSON.stringify(item.url)
                            }
                            reply(results.replace(/["]+/g, ''));
                        }

                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "img": // https://wwebjs.dev/guide/handling-attachments.html#sending-media

                        async function sendMedia(link, number, text) {
                            const mediaLink = await MessageMedia.fromUrl(link); // await MessageMedia.fromFilePath('./image.png');
                            client.sendMessage(number, mediaLink, { caption: text }).then(function (res) { }).catch(function (err) { });
                        }
                        sendMedia('https://stihi.ru/pics/2014/06/08/4002.jpg', msg.from, 'Hi').then(function () { });
                        break;
                    // song ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
                            ran = getRandom('.opus')
                            exec(`yt-dlp -x --audio-format opus -o, --output ${ran} "ytsearch:${value}"`, (err) => {

                                if (err) return reply(`${style} Error\n\n\n` + err.message)

                                sendMediaAudio(ran, msg.from, style + ' Heres your song').then(function () { });

                                async function sendMediaAudio(path, number, text) {
                                    try {
                                        const Audio = await MessageMedia.fromFilePath(path);
                                        client.sendMessage(number, Audio, { caption: text, sendAudioAsVoice: true }).then(function (res) { }).catch(function (err) { });

                                    } catch (err) {
                                        reply("error \n\n" + err.message)
                                    }
                                }
                            })

                        } catch (err) {
                            reply("error\n\n" + err.message)
                        }

                        break;
                    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "tagall":
                        if (!isRegister) return reply(registerMessage)
                        if (!isVip) return reply(vipMessage)
                        tagall()
                        async function tagall() {
                            const chat = await msg.getChat();

                            let text = " ";
                            let mentions = [];
                            var position = 0
                            for (let participant of chat.participants) {
                                const contact = await client.getContactById(participant.id._serialized);
                                position++
                                mentions.push(contact);
                                text += `\n - @${participant.id.user} `;
                            }

                            await client.sendMessage(msg.from, "total: " + position + text, { mentions });

                        }
                        break;
                    // video ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    case "video":
                        ytb(msg)
                        async function ytb(msg) {

                            const media = await MessageMedia.fromFilePath('./sending.mp4');
                            client.sendMessage(msg.from, media, { caption: "text" }).then(function (res) { }).catch(function (err) { });


                            /*  const Innertube = require('youtubei.js');
                              
                          
                              const youtube = await new Innertube();
                              const search = await youtube.search('Sound Coming From A Massive Black Hole - Anton Petrov');
                                
                              const stream = youtube.download(search.videos[0].id, {
                                format: 'mp4', // defaults to mp4
                                quality: '720p', // falls back to 360p if a specific quality isn't available
                                type: 'videoandaudio' 
                              });
                                
                              stream.pipe(fs.createWriteStream(`./sending.mp4`));
                               
                              stream.on('start', () => {
                                console.info('[YOUTUBE.JS]', 'Starting now!');
                              });
                                
                              stream.on('info', (info) => {
                                console.info('[YOUTUBE.JS]', `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);
                              });
                                
                              stream.on('progress', (info) => {
                                process.stdout.clearLine();
                                process.stdout.cursorTo(0);
                                process.stdout.write(`[YOUTUBE.JS] Downloaded ${info.percentage}% (${info.downloaded_size}MB) of ${info.size}MB`);
                              });
                                
                              stream.on('end', () => {
                                process.stdout.clearLine();
                                process.stdout.cursorTo(0);
                                console.info('[YOUTUBE.JS]', 'Done!');
                          
                                async function sendVid(link,number,text) {
                                  const media = await MessageMedia.fromFilePath('./sending.mp4');
                                  client.sendMessage(number, media, {caption: text}).then(function(res){}).catch(function(err){});
                              }
                              sendVid('./sending.mp4', msg.from, 'Hi').then(function (){});
                          
                              });
                                
                              stream.on('error', (err) => console.error('[ERROR]', err)); 
                                  */
                        }
                        break;
                    // default ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    default:
                        if (!isRegister) return reply(registerMessage)
                        reply(style + " what even is this command")
                }
                function reply(message) {
                    try {
                        msg.reply(message)
                    } catch (err) {
                        reply("there was an error\n\n" + err.message)
                    }
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
        )
    }
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
client.initialize();
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');

    if (indexOfSpace === -1) {
        return '';
    }

    return str.substring(indexOfSpace + 1);
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
