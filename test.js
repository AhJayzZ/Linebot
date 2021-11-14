var urlToImage = require('url-to-image');

myurl = "https://img.ifunny.co/images/d875d8581b34cbb1caa6d449c1cd244789439b68b2474853893b87ff983d830c_3.webp"

urlToImage(myurl, 'google.png').then(function() {
    // now google.png exists and contains screenshot of google.com
}).catch(function(err) {
    console.error(err);
});