const keyword = {
	DOG: 'dog',
	CAT: 'cat',
	BEAUTY: 'beauty',
	INDEX: 'index',
	INFO: 'info',
	KEYWORD: '關鍵字',
}

const print_all_key_word = () => {
	let message = '所有可用關鍵字為:'
	for (let key in keyword) {
		if (keyword.hasOwnProperty(key)) {
			message += ` "${keyword[key]}" `
		}
	}
	return message
}

module.exports = {
	keyword,
	print_all_key_word
}