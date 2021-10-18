const linebot = require('linebot');
const express = require('express');
const request = require('request');
const DOMParser = require('dom-parser');

var bot = linebot({
    channelId: 1653887573,
    channelSecret: '7e6117cb1d36b389c79a95994bb63965',
    channelAccessToken: 'RkwD54gpuR39YS+FYVZJgcnODhWiCCFhBjFBqMdVo8MmYGioCDUP7mBJnnfzTh/bE4RYEXdy4gBCjzlxoxbatgbydcYLub6VpDq/akUUdtsi+Pxc67WLgHMIg2d9cIYlPRkrP08aX5p7oZLThtXccwdB04t89/1O/w1cDnyilFU=',

});

//-------------------------------------------------------------------------



bot.on('message', function(event) {
    // Log the event
    console.log(event);

    // Reply the same message 
    if (event.message.type == 'text') {
        var msg = event.message.text;
        console.log('Recevied Message:', msg);

        // Tutorial
        if (msg.search('!說明') != -1 || msg.search('!指令') != -1 || msg.search('!help') != -1 || msg.search('!Help') != -1)
            event.reply('目前指令有:\n!抽 (From Meme梗圖倉庫) \n!抽gif (From Meme梗圖倉庫GIF) \n!怒抽 (From Dcard梗圖版) \n!福利 (From Dcard西斯版)' +
                '\n!確診人數 (From CDC官網數據) \n!大便片 (From iFunny Memes) \n!怒尻 (建議是不要打啦==)');

        // Draw a funny meme image
        if (parseInt(msg.indexOf('!怒抽')) != -1)
            dcard_meme_draw(event);

        // Draw a random meme image
        if (parseInt(msg.indexOf('!抽')) != -1)
            drawcard(event);

        // Draw a sexy image
        if (parseInt(msg.indexOf('!福利')) != -1 || parseInt(msg.indexOf('!福z')) != -1)
            dcard_sex_draw(event);


        // Draw a meme video
        if (parseInt(msg.indexOf('!大便片')) != -1)
            meme_video(event);

        //covid-19 check
        if (parseInt(msg.indexOf('!確診人數')) != -1)
            covid_19_check(event);

        // Stricker_GOOD
        if (parseInt(msg.indexOf('!讚')) != -1 || parseInt(msg.indexOf('言贊')) != -1) {
            sticker_msg = {
                "type": "sticker",
                "packageId": "11539",
                "stickerId": "52114117"
            }
            event.reply(sticker_msg);
        }

        // Secret
        if (parseInt(msg.indexOf('!怒尻')) != -1) {
            video_msg = {
                'type': 'video',
                'originalContentUrl': 'https://kekma.net/zzart.mp4',
                'previewImageUrl': 'https://kekma.net/button.jpg',
            }
            event.reply(video_msg);
        }


        // if (parseInt(msg.indexOf('王勁杰')) != -1)
        //     event.reply('老大還在睡覺');

    }

});


//-------------------------------------------------------------------------------------

function drawcard(event) {
    var msg = event.message.text
    if (msg.search('!抽gif') != -1) {
        // For gif image
        var random_num = Math.floor(Math.random() * 45);
        meme_url = 'https://memes.tw/gif-post?page=' + String(random_num);
    } else if (msg.search('!抽') != -1) {
        // For jpg image
        var random_num = Math.floor(Math.random() * 5000);
        meme_url = 'https://memes.tw/wtf?page=' + String(random_num);
    }


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

        var image_msg = {
            type: 'image',
            originalContentUrl: image_url,
            previewImageUrl: image_url,
        }

        event.reply(image_msg);

    });
}

//-------------------------------------------------------------------------------------

function dcard_meme_draw(event) {
    var image_url_array = [];
    const limit = 100;
    myrequest = {
        url: 'https://www.dcard.tw/service/api/v2/forums/meme/posts?&limit=' + String(limit),
        headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36' },
        method: 'GET',
        json: true,
    }
    request(myrequest, (error, res, data) => {
        if (error)
            return console.log('Error:', error);
        if (res.statusCode != 200)
            return console.log('Status code:', res.statusCode);
        if (!error & res.statusCode == 200) {
            // Collecting all image
            for (var x = 0; x < limit; x++) {
                if (data[x].mediaMeta.length != 0)
                    for (var y = 0; y < data[x].mediaMeta.length; y++)
                        image_url_array.push(data[x].mediaMeta[y].url);
            }

            // Randomly choose the image url and send message
            var random_num = Math.floor(Math.random() * image_url_array.length);
            image_url = image_url_array[random_num];
            console.log('dcard meme image url:', image_url);
            //Release image url array
            image_url_array.length = 0;

            var image_msg = {
                type: 'image',
                originalContentUrl: image_url,
                previewImageUrl: image_url,
            }
            event.reply(image_msg);
        }
    })
}


//-------------------------------------------------------------------------------------

function dcard_sex_draw(event) {
    var image_url_array = [];
    const limit = 100;
    myrequest = {
        url: 'https://www.dcard.tw/service/api/v2/forums/sex/posts?&limit=' + String(limit),
        headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36' },
        method: 'GET',
        json: true,
        proxy: 'http://158.177.253.24:80'
    }
    request(myrequest, (error, res, data) => {
        if (error)
            return console.log('Error:', error);
        if (res.statusCode != 200)
            return console.log('Status code:', res.statusCode);
        if (!error & res.statusCode == 200) {
            console.log('success');
            // Collecting all image
            for (var x = 0; x < limit; x++) {
                if (data[x].media.length != 0)
                    for (var y = 0; y < data[x].media.length; y++)
                        image_url_array.push(data[x].media[y].url);
            }

            // Randomly choose the image url and send message
            var random_num = Math.floor(Math.random() * image_url_array.length);
            image_url = image_url_array[random_num];
            console.log('dcard sex image url length:', image_url_array.length);
            console.log('dcard sex image url:', image_url);
            //Release image url array
            image_url_array.length = 0;

            var image_msg = {
                type: 'image',
                originalContentUrl: image_url,
                previewImageUrl: image_url,
            }
            event.reply(image_msg);
        }

    })

}

//-------------------------------------------------------------------------------------

function meme_video(event) {
    var random_page = Math.floor(Math.random() * 400);
    const meme_base_url = 'https://ifunny.co/';
    const meme_home_url = 'https://ifunny.co/memes/page' + String(random_page) + '?filter=video';

    //Step 1.Get random video content url
    request(meme_home_url, { method: 'GET' }, (error, res, body) => {
        if (error)
            return console.log('Error:', error);
        if (res.statusCode != 200)
            return console.log('Status code:', res.statusCode);
        if (!error & res.statusCode == 200) {
            const parser = new DOMParser();
            var random_index = Math.floor(Math.random() * 20);
            var htmlDoc = parser.parseFromString(body, 'text/html');
            var videoClass = htmlDoc.getElementsByClassName('_26gD _3_Go')[0];
            var videoInnerClass = videoClass.getElementsByClassName('_3brC')[random_index]
            var FinalClassName = videoInnerClass.getElementsByClassName('_3JkW _2YST')[0]
                //var videoUrl = FinalClassName.getAttribute('src')
            console.log(FinalClassName.outerHTML)
        }

        // //Step 2.Get mp4 in video url
        // request(video_url, { method: 'GET' }, (error, res, body) => {
        //     if (error)
        //         return console.log('Error:', error);
        //     if (res.statusCode != 200)
        //         return console.log('Status code:', res.statusCode);
        //     if (!error & res.statusCode == 200) {
        //         const parser = new DOMParser();
        //         var htmlDoc = parser.parseFromString(body, 'text/html');
        //         var preview_image_class_name = htmlDoc.getElementsByClassName('js-media-player')[0];
        //         var preview_image_url = preview_image_class_name.getAttribute('poster');
        //         var mp4_class_name = htmlDoc.getElementsByClassName('media media_fun js-media js-playlist-media ')[0];
        //         var mp4_url = mp4_class_name.getAttribute('data-source');
        //         console.log('mp4_url:', mp4_url);

        //         // Step 3.Sending the video 
        //         var video_msg = {
        //             'type': 'video',
        //             'originalContentUrl': mp4_url,
        //             'previewImageUrl': preview_image_url,
        //         }
        //         event.reply(video_msg);
        //     }

        // })

    })
}

//-------------------------------------------------------------------------------------

function covid_19_check(event) {

    const cdc_data_url = 'https://covid19dashboard.cdc.gov.tw/dash3';

    request(cdc_data_url, { method: 'GET', json: true }, (error, res, data) => {
        if (error)
            return console.log('Error:', error);
        if (res.statusCode != 200)
            return console.log('Status code:', res.statusCode);
        if (!error & res.statusCode == 200) {
            const parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            console.log(htmlDoc);
            //Yesterday
            var yesterday_total_report = '昨日通報數: ' + data[0].昨日送驗 + '\n';
            var yesterday_report_exclude = '昨日排除數: ' + data[0].昨日排除 + '\n';
            var yesterday_confirmed_case = '昨日確診數: ' + data[0].昨日確診 + '\n';

            //Total 
            var total_report = '總計通報數: ' + data[0].送驗 + '\n';
            var report_exclude = '總計排除數: ' + data[0].排除 + '\n';
            var confirmed_case = '總計確診數: ' + data[0].確診 + '\n';
            var confirmed_dead = '總計死亡數: ' + data[0].死亡 + '\n';
            var isolated_release = '總計解除隔離數: ' + data[0].解除隔離;

            event.reply(yesterday_total_report + yesterday_report_exclude + yesterday_confirmed_case + '\n' +
                total_report + report_exclude + confirmed_case + confirmed_dead + isolated_release);
        }
    });


}


//-------------------------------------------------------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});