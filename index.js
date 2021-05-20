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



bot.on('message', function(event) {
    // Log the event

    console.log(event);

    // Reply the same message 
    if (event.message.type == 'text') {
        var msg = event.message.text;
        console.log('Recevied Message:', msg);

        // Draw a funny meme
        if (parseInt(msg.indexOf('怒抽')) != -1)
            dcard_meme_draw(event);


        // Draw a random image
        if (parseInt(msg.indexOf('抽')) != -1)
            drawcard(event);

        // Draw a sexy image
        if (parseInt(msg.indexOf('福利')) != -1 || parseInt(msg.indexOf('福z')) != -1)
            dcard_sex_draw(event);


        // Draw a meme videoㄩ
        if (parseInt(msg.indexOf('大便片')) != -1)
            meme_video(event)


        if (parseInt(msg.indexOf('讚')) != -1 || parseInt(msg.indexOf('言贊')) != -1) {
            sticker_msg = {
                "type": "sticker",
                "packageId": "11539",
                "stickerId": "52114117"
            }
            event.reply(sticker_msg)
        }

        if (msg == '怒尻') {
            video_msg = {
                'type': 'video',
                'originalContentUrl': 'https://kekma.net/zzart.mp4',
                'previewImageUrl': 'https://kekma.net/button.jpg',
            }
            event.reply(video_msg)
        }


        // if (parseInt(msg.indexOf('王勁杰')) != -1)
        //     event.reply('老大還在睡覺');

    }

});

//-------------------------------------------------------------------------------------
function drawcard(event) {
    var msg = event.message.text
    if (msg.search('抽gif') != -1) {
        // For gif image
        var random_num = Math.floor(Math.random() * 45);
        meme_url = 'https://memes.tw/gif-post?page=' + String(random_num);
    } else if (msg.search('抽') != -1) {
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
                    for (var y = 0; y < data[x].mediaMeta.length; y++) {
                        console.log('data[x].mediaMeat[y].url:', data[x].mediaMeta[y].url)
                        image_url_array.push(data[x].mediaMeta[y].url)
                    }
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
                if (data[x].media.length != 0)
                    for (var y = 0; y < data[x].media.length; y++)
                        image_url_array.push(data[x].media[y].url)
            }

            // Randomly choose the image url and send message
            var random_num = Math.floor(Math.random() * image_url_array.length);
            image_url = image_url_array[random_num];
            console.log('dcard sex image url length:', image_url_array.length)
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
            var video_class_name = htmlDoc.getElementsByClassName('grid__link js-goalcollector-action js-dwhcollector-actionsource')[random_index];
            var video_url = meme_base_url + String(video_class_name.getAttribute('href'));
            console.log('video_url:', video_url);
        }

        //Step 2.Get mp4 in video url
        request(video_url, { method: 'GET' }, (error, res, body) => {
            if (error)
                return console.log('Error:', error);
            if (res.statusCode != 200)
                return console.log('Status code:', res.statusCode);
            if (!error & res.statusCode == 200) {
                const parser = new DOMParser();
                var htmlDoc = parser.parseFromString(body, 'text/html');
                var preview_image_class_name = htmlDoc.getElementsByClassName('js-media-player')[0];
                var preview_image_url = preview_image_class_name.getAttribute('poster');
                var mp4_class_name = htmlDoc.getElementsByClassName('media media_fun js-media js-playlist-media ')[0];
                var mp4_url = mp4_class_name.getAttribute('data-source');
                console.log('mp4_url:', mp4_url);

                // Step 3.Sending the video 
                var video_msg = {
                    'type': 'video',
                    'originalContentUrl': mp4_url,
                    'previewImageUrl': preview_image_url,
                }
                event.reply(video_msg)
            }

        })

    })
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