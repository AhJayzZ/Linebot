const linebot = require('linebot')
const express = require('express')
const request = require('request')
const DOMParser = require('dom-parser')


var bot = linebot({
    channelId: 1653887573,
    channelSecret: '7e6117cb1d36b389c79a95994bb63965',
    channelAccessToken: 'RkwD54gpuR39YS+FYVZJgcnODhWiCCFhBjFBqMdVo8MmYGioCDUP7mBJnnfzTh/bE4RYEXdy4gBCjzlxoxbatgbydcYLub6VpDq/akUUdtsi+Pxc67WLgHMIg2d9cIYlPRkrP08aX5p7oZLThtXccwdB04t89/1O/w1cDnyilFU=',

})

//-------------------------------------------------------------------------


var name = ['王勁杰', '張上為', '林明輝', '莊家豪', '陳鴻宇', '張庭偉', '喇賽', '曾國祐', '翁廷翰', '姚勝文', '陳孟謙', '辛世文', '碰光軍光軍碰', 'Hao', '國祐'];
var dictionary = ['你媽死了', '幹你媽閉嘴', '耖及掰啦', '蔡英文執政的下場', '低能兒']
var key = '哈利波特';



bot.on('message', function(event) {
    // Log the event
    console.log(event);


    // Reply the same message 
    if (event.message.type = 'text') {
        var msg = event.message.text;
        console.log('Recevied:', msg);

        // Draw a card
        drawcard(event, msg);

        for (i = 0; i < name.length; i++) {
            if (msg.search(name[i]) != -1) {
                event.reply(name[i] + '是喜憨兒');
                break;
            }
        }

        if (msg.search('你好') != -1)
            event.reply('好你娘及掰啦');
        else if (msg.search('哈') != -1)
            event.reply('哈殺小,去哈龜啦');
        else if (msg.search('早安') != -1)
            event.reply('你媽死了知道不?');
        else if (msg.search('==') != -1 || msg.search('= =') != -1)
            event.reply('對不起各位!');
        else if (msg.search('可憐') != -1)
            event.reply('你全家才可憐');

        else if (msg.search('祖先') != -1) {
            mymsg = {
                type: 'image',
                originalContentUrl: 'https://i.imgur.com/C0gOn9V.jpg',
                previewImageUrl: "https://i.imgur.com/C0gOn9V.jpg",
            }
            event.reply(mymsg);
        } else if (msg.search('QQ') != -1)
            event.reply('Q你媽逼');

        else if (msg.search('!') != -1)
            event.reply('我看不懂啦QQ')
    }


});


function drawcard(event, msg) {
    if (msg.search('抽') != -1) {
        var ranmdom_num = Math.floor(Math.random() * 500);
        meme_url = 'https://memes.tw/wtf?page=' + String(ranmdom_num);
        console.log('memeUrl:', meme_url);


        myoption = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            }
        }


        request(meme_url, myoption, function(error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response & response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body);                               // Print the HTML for the Google homepage.

            const parser = new DOMParser();
            var random_index = Math.floor(Math.random() * 20);
            var htmlDoc = parser.parseFromString(body, 'text/html');
            var image_url = htmlDoc.getElementsByClassName('img-fluid lazy')[random_index].getAttribute('data-src')
            console.log('image_url:', image_url)

            image_msg = {
                type: 'image',
                //originalContentUrl: image_url,
                previewImageUrl: image_url,
            }

            event.reply(image_msg)
        })
    }
}


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
})