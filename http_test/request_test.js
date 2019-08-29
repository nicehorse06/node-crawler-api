const request = require('request');

let ptt_beauty_url = 'https://www.ptt.cc/bbs/Beauty/index.html'

payload = {
	'from': '/bbs/Beauty/index.html',
	'yes': 'yes'
}
let cookie = request.cookie('_ga=GA1.2.1249846467.1512454596; over18=1; __cfduid=d12790acf132d62b6b7b78e3f9b0a74a31543990688; _gid=GA1.2.2011876256.1566888653; _gat=1');
var headers = {
    'Cookie': cookie
};

request.get({ url: ptt_beauty_url, headers: headers}, (error, response, body) => { 
	console.log(body);
})