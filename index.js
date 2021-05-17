var linebot = require('linebot')
var express = require('express')

var bot = linebot({
    channelId: 1653887573,
    channelSecret: '7e6117cb1d36b389c79a95994bb63965',
    channelAccessToken: 'RkwD54gpuR39YS+FYVZJgcnODhWiCCFhBjFBqMdVo8MmYGioCDUP7mBJnnfzTh/bE4RYEXdy4gBCjzlxoxbatgbydcYLub6VpDq/akUUdtsi+Pxc67WLgHMIg2d9cIYlPRkrP08aX5p7oZLThtXccwdB04t89/1O/w1cDnyilFU=',

})

//-------------------------------------------------------------------------


var name = ["張上為", "林明輝", "莊家豪", "陳鴻宇", "張庭偉", "喇賽", "曾國佑", "翁廷翰", "姚勝文", "陳孟謙", "辛世文"];

bot.on('message', function(event) {
    //把收到訊息的 event 印出來看看
    console.log(event);

    // Reply the same message 
    if (event.message.type = 'text') {
        var msg = event.message.text;

        for (i = 0; i < name.length; i++) {
            if (msg.search("王勁杰") != -1) { event.reply('王勁杰是我老大!'); break; }

            if (msg.search(name[i]) != -1) {
                event.reply(name[i] + '我幹你娘啦');
                break;
            }
        }

        if (msg == '!抽' || msg == '!抽卡') {
            event.reply('抽殺小啦，我還在學習抽卡啦');
        }
        if (msg == '可憐') {
            event.reply('你全家才可憐');
        }
        console.log(msg);
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