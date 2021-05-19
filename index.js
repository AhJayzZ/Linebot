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


var angry_count = 0;
bot.on('message', function(event) {
    // Log the event
    console.log(event);


    // Reply the same message 
    if (event.message.type = 'text') {
        var msg = event.message.text;
        console.log('Recevied Message:', msg);

        // Draw a card
        if (parseInt(msg.search('抽')) != -1)
            drawcard(event, msg);



        for (i = 0; i < name.length; i++) {
            if (parseInt(msg.search(name[i])) != -1) {
                //Sleeping
                // if (msg.search('王勁杰') != -1)
                //     event.reply('老大在睡覺，不要吵')
                event.reply(name[i] + '是喜憨兒');
                break;
            }
        }

        if (parseInt(msg.search('你好')) != -1)
            event.reply('好你娘及掰啦');
        else if (parseInt(msg.search('哈')) != -1)
            event.reply('哈殺小,去哈龜啦');
        else if (parseInt(msg.search('早安')) != -1)
            event.reply('你媽死了知道不?');
        else if (parseInt(msg.search('==')) != -1 || parseInt(msg.search('= =')) != -1) {
            angry_count = angry_count + 1;
            event.reply('誰在打==或= =試看看啦，憤怒指數:' + angry_count);
        } else if (parseInt(msg.search('可憐')) != -1)
            event.reply('你全家才可憐');

        else if (parseInt(msg.search('祖先')) != -1) {
            mymsg = {
                type: 'image',
                originalContentUrl: 'https://i.imgur.com/C0gOn9V.jpg',
                previewImageUrl: "https://i.imgur.com/C0gOn9V.jpg",
            }
            event.reply(mymsg);
        } else if (parseInt(msg.search('QQ')) != -1)
            event.reply('Q你媽逼');

        else if (parseInt(msg.search('!')) != -1)
            event.reply('我看不懂啦QQ');
    }


});


function drawcard(event, msg) {
    var ranmdom_num = Math.floor(Math.random() * 500);
    meme_url = 'https://memes.tw/wtf?page=' + String(ranmdom_num);
    console.log('memeUrl:', meme_url);

    var myoption = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            //'Host': 'memeprod.sgp1.digitaloceanspaces.com',
            //'Accept-Encoding': 'gzip, deflate,br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Cache-Control': 'max-age=0',
            'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6',
            'Connection': 'keep-alive',
            'sec-ch-ua': '"Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
        }
    }

    request(meme_url, myoption, function(error, response, body) {
        // Print the error if one occurred
        console.error('error:', error);

        // Print the response status code if a response was received
        console.log('statusCode:', response & response.statusCode);

        // Print the HTML for the Google homepage.
        //console.log('body:', body);                           

        const parser = new DOMParser();
        var random_index = Math.floor(Math.random() * 20);
        var htmlDoc = parser.parseFromString(body, 'text/html');
        var image_class_name = htmlDoc.getElementsByClassName('img-fluid lazy')[random_index]
        var image_url = image_class_name.getAttribute('data-src')
        console.log('image_url:', image_url)

        image_msg = {
            type: 'image',
            originalContentUrl: image_url,
            previewImageUrl: image_url,
        }

        event.reply(image_msg).then(function() { event.reply(image_url) });

    });
}


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
})