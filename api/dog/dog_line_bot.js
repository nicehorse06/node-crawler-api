const get_dog_image = require('./dog_api.js')

const dog_line_bot = (text) => {
	return get_dog_image()
		.then((img) => {
			console.log(img)	
			return [
				{ type: 'text', text: '這是一張狗狗圖，之後可以指定品種' },
				{ type: 'image', originalContentUrl: img, previewImageUrl: img },
			]
		})
}

module.exports = dog_line_bot;