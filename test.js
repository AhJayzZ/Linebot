const request = require('request');

myrequest = {
    url: 'https://www.proxyscan.io/api/proxy?type=http',
    //  headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36' },
    method: 'GET',
    json: true,
}


request(myrequest, (error, res, data) => {
    if (error)
        return console.log('Error:', error);
    if (res.statusCode != 200)
        return console.log('Status code:', res.statusCode);
    if (!error & res.statusCode == 200)
        return console.log(data[0]);

});