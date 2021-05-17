var linebot = require('linebot')
var express = require('express')

var bot = linebot({
    channelId: 1653887573,
    channelSecret: '7e6117cb1d36b389c79a95994bb63965',
    channelAccessToken: 'RkwD54gpuR39YS+FYVZJgcnODhWiCCFhBjFBqMdVo8MmYGioCDUP7mBJnnfzTh/bE4RYEXdy4gBCjzlxoxbatgbydcYLub6VpDq/akUUdtsi+Pxc67WLgHMIg2d9cIYlPRkrP08aX5p7oZLThtXccwdB04t89/1O/w1cDnyilFU=',

})

//-------------------------------------------------------------------------

bot.on('message', function(event) {
    //把收到訊息的 event 印出來看看
    console.log(event);

    // Reply the same message 
    if (event.message.type = 'text') {
        var msg = event.message.text;

        // event.reply(msg).then(function(data) { console.log(msg); }).catch(function(error) { console.log('error'); })
        if (msg == '張上為' || msg == '@張上為') {
            event.reply('張上為我幹你娘啦');
            console.log(msg);
        }
        if (msg == '!抽' || msg == '!抽卡') {
            event.reply('抽你媽啦，還沒弄好');
            console.log(msg);
        }

    }


});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});