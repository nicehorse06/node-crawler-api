const fetch = require('node-fetch')

let ptt_beauty_url = 'https://www.ptt.cc/bbs/Beauty/index.html'
// ref https://stackoverflow.com/questions/24365600/passing-cookies-in-nodejs-http-request
var headers = {
    'Cookie': 'over18=1;'
};

// const result = await fetch(`/some/url`, {headers});
fetch(ptt_beauty_url, {headers}).then(response => {
	return response.text()
}).then((body) => {
	console.log(body)
})