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


var name = ['王勁杰', '張上為', '林明輝', '莊家豪', '陳鴻宇', '張庭偉', '喇賽', '曾國佑', '翁廷翰', '姚勝文', '陳孟謙', '辛世文', '碰光軍光軍碰', 'Hao', '國佑'];

bot.on('message', function(event) {
    // Log the event
    console.log(event);

    // Reply the same message 
    if (event.message.type = 'text') {
        var msg = event.message.text;
        console.log('Recevied:', msg);

        //drawcard(msg);


        for (i = 0; i < name.length; i++) {
            if (msg.search(name[i]) != -1) {
                event.reply(name[i] + '我幹你娘啦');
                break;
            }
        }

        if (msg == '!抽' || msg == '!抽卡')
            event.reply('抽殺小啦，我還在學習抽卡啦');

        if (msg.search('可憐') != -1)
            event.reply('你全家才可憐')

        if (msg.search('祖先') != -1) {
            event.reply('這是我的祖先');
            mymsg = {
                type: 'image',
                originalContentUrl: 'https://i.imgur.com/C0gOn9V.jpg',
                previewImageUrl: "https://i.imgur.com/C0gOn9V.jpg",
            }
            event.reply(mymsg);
        }
    }


});


function drawcard(msg) {
    if (msg == '!抽' || msg == '抽卡') {
        var ranmdom_num = Math.floor(Math.random() * 500);
        meme_url = 'https://memes.tw/wtf?page=' + String(ranmdom_num);
        console.log('memeUrl:', meme_url);

        request(meme_url, function(error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body); // Print the HTML for the Google homepage.

            const parser = new DOMParser();
            var htmlDoc = parser.parseFromString(body, 'text/html');
            meme_class_name = htmlDoc.getElementsByClassName('img-fluid lazy loaded');
            console.log(meme_class_name)
        });


    }
}










const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});