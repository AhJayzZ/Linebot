const linebot = require('linebot')
const express = require('express')
const request = require('request')
const DOMParser = require('dom-parser')
const { json } = require('express')



var bot = linebot({
    channelId: 1653887573,
    channelSecret: '7e6117cb1d36b389c79a95994bb63965',
    channelAccessToken: 'RkwD54gpuR39YS+FYVZJgcnODhWiCCFhBjFBqMdVo8MmYGioCDUP7mBJnnfzTh/bE4RYEXdy4gBCjzlxoxbatgbydcYLub6VpDq/akUUdtsi+Pxc67WLgHMIg2d9cIYlPRkrP08aX5p7oZLThtXccwdB04t89/1O/w1cDnyilFU=',

})

//-------------------------------------------------------------------------


var name = ['王勁杰', '張上為', '林明輝', '莊家豪', '陳鴻宇', '張庭偉', '喇賽', '曾國祐', '翁廷翰', '姚勝文', '陳孟謙', '辛世文', '碰光軍光軍碰', 'Hao', '國祐'];
var dictionary = ['你媽死了', '幹你媽閉嘴', '耖及掰啦', '蔡英文執政的下場', '低能兒'];
var dcard_sex_image_url = [];
var temp_url = ['https://imgur.dcard.tw/O1hb6onb.jpg',
    'https://imgur.dcard.tw/ek3BcUmb.jpg',
    'https://imgur.dcard.tw/RpuS9Nwb.jpg',
    'https://imgur.dcard.tw/hOx7oNIb.jpg',
    'https://imgur.dcard.tw/3ZMDZYjb.jpg',
    'https://imgur.dcard.tw/ecgTtUnb.jpg',
    'https://imgur.dcard.tw/ba1Dgq4b.jpg',
    'https://imgur.dcard.tw/BaGvrzHb.jpg',
    'https://imgur.dcard.tw/4lVjASOb.jpg',
    'https://imgur.dcard.tw/kKajTfHb.jpg',
    'https://imgur.dcard.tw/QIbISoFb.jpg',
    'https://imgur.dcard.tw/J3jp2wfb.jpg',
    'https://imgur.dcard.tw/hkjSP9wb.jpg',
    'https://imgur.dcard.tw/wzhNltrb.jpg',
    'https://imgur.dcard.tw/KTy2NW9b.jpg',
    'https://imgur.dcard.tw/iaXDIT7b.jpg',
    'https://imgur.dcard.tw/e6xakwUb.jpg',
    'https://imgur.dcard.tw/Z4xnqjBb.jpg',
    'https://imgur.dcard.tw/Oyndfwvb.jpg',
    'https://imgur.dcard.tw/44FFNjQb.jpg',
];

var angry_count = 0;

bot.on('message', function(event) {
    // Log the event
    console.log(event);

    // Reply the same message 
    if (event.message.type == 'text') {
        var msg = event.message.text;
        console.log('Recevied Message:', msg);

        // Draw a meme image
        if (parseInt(msg.indexOf('抽')) != -1)
            drawcard(event);

        // Draw a sexy image
        if (parseInt(msg.indexOf('奶子')) != -1) {
            var random_index = Math.floor(Math.random() * 20);
            img_msg = {
                type: 'image',
                originalContentUrl: temp_url[random_index],
                previewImageUrl: temp_url[random_index],
            }
            event.reply(img_msg);
        }

        if (parseInt(msg.indexOf('測試')) != -1)
            dcard_sex_draw(event);











    }

});


function drawcard(event) {
    var ranmdom_num = Math.floor(Math.random() * 5000);
    meme_url = 'https://memes.tw/wtf?page=' + String(ranmdom_num);
    console.log('memeUrl:', meme_url);

    request(meme_url, function(error, response, body) {
        // Print the error if one occurred
        console.error('error:', error);

        // Print the response status code if a response was received
        console.log('statusCode:', response & response.statusCode);

        // Print the HTML for the Google homepage.
        //console.log('body:', body);                           

        const parser = new DOMParser();
        var random_index = Math.floor(Math.random() * 20);
        var htmlDoc = parser.parseFromString(body, 'text/html');
        var image_class_name = htmlDoc.getElementsByClassName('img-fluid lazy')[random_index];
        var image_url = image_class_name.getAttribute('data-src');
        console.log('image_url:', image_url);

        image_msg = {
            type: 'image',
            originalContentUrl: image_url,
            previewImageUrl: image_url,
        }

        event.reply(image_msg);

    });
}


function dcard_sex_draw(event) {

    myrequest = {
        url: 'https://www.dcard.tw/service/api/v2/forums/sex/posts?limit=100',
        method: 'GET',
        json: true,
    }


    event.reply('收到');
    request(myrequest, (error, res, data) => {
        if (error)
            return console.log('Error:', error);
        if (res.statusCode != 200)
            return console.log('Status code:', res.statusCode);
        if (!error & res.statusCode == 200) {
            url_data = JSON.stringify(data);
            // for (var k = 0; k < 99; k++) {

            // }
            image_url = url_data.id
            console.log(image_url);

        }




        // image_msg = {
        //     type: 'image',
        //     originalContentUrl: image_url,
        //     previewImageUrl: image_url,
        // }
        // event.reply(image_msg)
    })



}


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});