const fetch = require('node-fetch')

let ptt_beauty_url = 'https://www.ptt.cc/bbs/Beauty/index.html'
// ref https://stackoverflow.com/questions/24365600/passing-cookies-in-nodejs-http-request
var headers = {
    'Cookie': 'over18=1;'
};

// 沒有包裝
fetch(ptt_beauty_url, {headers}).then(response => {
	return response.text()
}).then((body) => {
	console.log(body)
})

// 包裝成函示
const fetch_api = (url) => {
	return fetch(url, {headers: {'Cookie': 'over18=1;'}})
}

fetch_api(ptt_beauty_url).then(response => {
	return response.text()
}).then((body) => {
	// console.log(body)
})