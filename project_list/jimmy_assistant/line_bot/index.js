const beauty_line_bot = require('./ptt_beauty')
const dog_line_bot = require('../../../api/dog/dog_line_bot')
const cat_line_bot = require('../../../api/cat/cat_line_bot')
// todo 用 keyword 取代 text 中的關鍵字
const { keyword } = require('../../../keyword')

let index_menu = () => {
	let button_template = {
		type: 'template',
		altText: '導覽選單',
		template: {
			type: 'buttons',
			title: '導覽選單',
			text: '以下為目前頻道所有功能，持續更新，有想到不錯的點子可以跟我說',
			actions: []
		}
	}

	button_template.template.actions = button_template.template.actions.concat([
		{ type: 'message', label: `看狗狗圖`, text: 'dog' },
		{ type: 'message', label: `看貓貓圖`, text: 'cat' },
		{ type: 'message', label: `看PTT表特版`, text: 'beauty' },
		{ type: 'message', label: `關於此頻道`, text: 'info' },
	])

	return new Promise((resolve, reject) => {
		resolve(button_template)
	})
}

module.exports = {
	ptt_beauty: beauty_line_bot,
	dog: dog_line_bot,
	cat: cat_line_bot,
	index: index_menu,
};