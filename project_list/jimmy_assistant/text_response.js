const linebot_api = require('./line_bot')
const { keyword, print_all_key_word } = require('../../keyword')

const response_message = (message_text) => {
	// 目前所有大寫都轉成小寫，甚至連參數都改了，這需要特別注意 TODO
	message_text = message_text.toLowerCase()

	if (message_text === keyword.INDEX) {
		return linebot_api['index']()
	} else if (message_text === keyword.DOG) {
		return linebot_api['dog']()
	} else if (message_text === keyword.CAT) {
		return linebot_api['cat']()
	} else if (message_text.match(new RegExp(keyword.BEAUTY))) {
		return linebot_api['ptt_beauty'](message_text)
	} else {
		let response_list = []
		if (message_text === keyword.KEYWORD) {
			res = print_all_key_word()
			response_list.push({
				type: 'text',
				text: res
			})
		} else if (message_text === 'info') {
			line_bot_qr_code = 'https://i.imgur.com/Y6XZ3jT.jpg'

			response_list = response_list.concat([
				{ type: 'text', text: '如果有什麼想做而實用的功能可以跟我說' },
				{ type: 'text', text: '我的email: um06zj4g3@gmail.com' },
				{ type: 'text', text: 'line_bot id: @ihg2013q' },
				{ type: 'text', text: 'line_bot QR code:' },
				{ type: 'image', originalContentUrl: line_bot_qr_code, previewImageUrl: line_bot_qr_code }
			])

		} else {
			res = `您輸入的訊息為 ${message_text}，目前無此功能，請點選以下按鈕繼續`

			let button_template = {
				type: 'template',
				altText: '表特圖片功能選單',
				template: {
					type: 'buttons',
					title: '無此功能',
					text: res,
					actions: []
				}
			}
			button_template.template.actions.push({
				type: 'message',
				label: `所有功能導覽`,
				text: `index`
			})

			button_template.template.actions.push({
				type: 'message',
				label: `查詢所有關鍵字`,
				text: `關鍵字`
			})

			response_list.push(button_template)
		}

		return new Promise((resolve, reject) => {
			console.log(response_list)
			resolve(response_list)
		})
	}
}

module.exports = response_message;