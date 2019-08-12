const linebot = require('linebot');
const { tjc_token } = require('../../config.js')
const search_nearest_church = require('../../api/tjc/nearest_church_api')

const bot = linebot({
	channelId: tjc_token.channel.id,
	channelSecret: tjc_token.channel.secret,
	channelAccessToken: tjc_token.channel.accessToken
});

let response_list = []
const example_picture = 'https://i.imgur.com/cVr5ae2.jpg'
const line_QR_code = 'https://i.imgur.com/cjmB3Qa.jpg'

response_list = response_list.concat([
	{ type: 'text', text: '目前僅開放傳入位置資訊的功能' },
	{ type: 'text', text: '請用Line傳入你的位置資訊來搜尋最近的真耶穌教會' },
	{ type: 'text', text: '範例如下：' },
	{ type: 'image', originalContentUrl: example_picture, previewImageUrl: example_picture }
])

// 處理 message 事件
bot.on('message', function (event) {
	// 需要打印訊息確定送來的型態
	console.log('使用者發送訊息：', event.message)

	// 訊息型態為文字
	if (event.message.type === 'text') {
		const text = event.message.text;
		if (text.toLowerCase() === 'info') {
			let info_list = []
			info_list = info_list.concat([
				{ type: 'text', text: '此頻道的好友ID為:' },
				{ type: 'text', text: '@abs7070f' },
				{ type: 'text', text: '此頻道的 QR code為' },
				{ type: 'image', originalContentUrl: line_QR_code, previewImageUrl: line_QR_code }
			])
			event.reply(info_list)
		} else {
			// 這行會有bug
			// response_list.unshift({ type: 'text', text: `您輸入的訊息為${text}` })
			event.reply(response_list)
		}
	} else if (event.message.type === 'location') {
		const nearest_church = search_nearest_church(event.message.latitude, event.message.longitude)

		event.reply({
			type: 'location',
			title: `離你最近的教會：${nearest_church._name_tw}\n電話：${nearest_church._tel}`,
			address: nearest_church._address,
			latitude: nearest_church.geo_latitude,
			longitude: nearest_church.geo_longitude,
		});
	} else {
		event.reply(response_list).then(function (data) {
			// success 
			console.log(res);
		}).catch(function (error) {
			// error 
			console.log(`錯誤訊息 ${error}`);
		});
	}
});

// 驗證數位簽章並解析JSON物件
const tjc_linebotParser = bot.parser();

module.exports = tjc_linebotParser