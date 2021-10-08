const { get } = require('request');
const request = require('request');


ip_url = 'https://www.whatismyip.com.tw/tw/'
proxy_api = 'https://www.proxyscan.io/api/proxy?type=http&limit=1'

function get_proxy_ip() {
    myrequest = {
        url: proxy_api,
        //  headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36' },
        method: 'GET',
    }

    request(myrequest, (error, res, data) => {
        if (error)
            console.log(error);
        if (res.statusCode != 200)
            console.log('Status code:', res.statusCode);
        if (!error & res.statusCode == 200) {
            var proxy_ip = JSON.parse(data)[0].Ip;
            console.log(proxy_ip)
            return proxy_ip;
        }
        console.log(res.statusCode)

    });

}

function check_ip() {
    var proxy_ip = get_proxy_ip();
    mynewrequest = {
        url: ip_url,
        //  headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36' },
        method: 'GET',
        // proxy: proxy_ip,
    }
    console.log('proxy_ip:' + proxy_ip);

    // request(mynewrequest, (error, res, data) => {
    //     if (error)
    //         console.log(error);
    //     if (res.statusCode != 200)
    //         console.log('Status code:', res.statusCode);
    //     if (!error & res.statusCode == 200) {
    //         console.log(data)
    //     }
    // })
}

check_ip()