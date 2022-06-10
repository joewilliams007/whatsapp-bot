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
    const body = msg.body.split("")[1]
    const args = body.split(" ")

    if (msg.body.split("")[0]==".") {

    switch(msg.body.split(".",2)[1]) {
        case "bot":
            msg.reply('Hai '+msg._data.notifyName);
          break;
case "menu":
            msg.reply('Menu:\n\n.bot');
break;

case 'search':
if (args.length < 1) return reply(`𝑊ℎ𝑎𝑡 𝑖𝑠 𝑡ℎ𝑒 𝑠𝑜𝑛𝑔 𝑛𝑎𝑚𝑒?`)	

var yt = require('youtube-search-without-api-key');
var videos = await yt.search(`${value}`);

var views = videos[0].views
var views1 = videos[1].views
var views2= videos[2].views
var views3 = videos[3].views
var views4 = videos[4].views

var getJSON = require('get-json')
getJSON(`https://returnyoutubedislikeapi.com/votes?videoId=${videos[0].id.videoId}`, function(error, resyt){
getJSON(`https://returnyoutubedislikeapi.com/votes?videoId=${videos[1].id.videoId}`, function(error, resyt1){
getJSON(`https://returnyoutubedislikeapi.com/votes?videoId=${videos[2].id.videoId}`, function(error, resyt2){
getJSON(`https://returnyoutubedislikeapi.com/votes?videoId=${videos[3].id.videoId}`, function(error, resyt3){
getJSON(`https://returnyoutubedislikeapi.com/votes?videoId=${videos[4].id.videoId}`, function(error, resyt4){

var _rating = resyt.rating
var rating = _rating.toString()
rating = rating.substring(0, 3);
var _rating1 = resyt1.rating
var rating1 = _rating1.toString()
rating1 = rating1.substring(0, 3);
var _rating2 = resyt2.rating
var rating2 = _rating2.toString()
rating2 = rating2.substring(0, 3);
var _rating3 = resyt3.rating
var rating3 = _rating3.toString()
rating3 = rating3.substring(0, 3);
var _rating4 = resyt4.rating
var rating4 = _rating4.toString()
rating4 = rating4.substring(0, 3);

var likes = resyt.likes
var dislikes = resyt.dislikes
var likes1 = resyt1.likes
var dislikes1 = resyt1.dislikes
var likes2 = resyt2.likes
var dislikes2 = resyt2.dislikes
var likes3 = resyt3.likes
var dislikes3 = resyt3.dislikes
var likes4 = resyt4.likes
var dislikes4 = resyt4.dislikes

reply(`${design} 𝑅𝑒𝑠𝑢𝑙𝑡𝑠 𝑓𝑜𝑢𝑛𝑑
- - - - - - - - - - - - - - - - - -
${design} _${videos[0].title}_
🕰️ _${videos[0].duration_raw}_
⭐ _${rating.trim()}/5 Stars_
📷 _${views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} Views_
${design} _${videos[0].snippet.publishedAt}_
📦 _.getsearch 1_
📡 _${videos[0].url}_
👍 _Likes ${likes.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
👎 _Dislikes ${dislikes.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
- - - - - - - - - - - - - - - - - -
${design} _${videos[1].title}_
🕰️ _${videos[1].duration_raw}_
⭐ _${rating1.trim()}/5 Stars_
📷 _${views1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} Views_
📆 _${videos[1].snippet.publishedAt}_
📦 _.getsearch 2_
📡 _${videos[1].url}_
👍 _Likes ${likes1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
👎 _Dislikes ${dislikes1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
- - - - - - - - - - - - - - - - - - 
${design} _${videos[2].title}_
🕰️ _${videos[2].duration_raw}_
⭐ _${rating2.trim()}/5 Stars_
📷 _${views2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} Views_
📆 _${videos[2].snippet.publishedAt}_
📦 _.getsearch 3_ 
📡 _${videos[2].url}_
👍 _Likes ${likes2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
👎 _Dislikes ${dislikes2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
- - - - - - - - - - - - - - - - - -
${design} _${videos[3].title}_
🕰️ _${videos[3].duration_raw}_
⭐ _${rating3.trim()}/5 Stars_
📷 _${views3.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} Views_
📆 _${videos[3].snippet.publishedAt}_
📦 _.getsearch 4_
📡 _${videos[3].url}_
👍 _Likes ${likes3.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
👎 _Dislikes ${dislikes3.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
- - - - - - - - - - - - - - - - - -
${design} _${videos[4].title}_
🕰️ _${videos[4].duration_raw}_
⭐ _${rating4.trim()}/5 Stars_
📷 _${views4.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} Views_
📆 _${videos[4].snippet.publishedAt}_
📦 _.getsearch 5_
📡 _${videos[4].url}_
👍 _Likes ${likes4.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
👎 _Dislikes ${dislikes4.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}_
${moneystatus}
${design} _Only for short videos .getvid_
- - - - - - - - - - - - - - - - - -
❇️ 𝑆𝑒𝑎𝑟𝑐ℎ`)

	        })
             })
        })
    })
})


break


default:
          msg.reply("what even is this command")
      }
    }
});


client.initialize();