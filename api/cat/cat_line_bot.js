const get_cat_image = require('./cat_api.js')


const cat_line_bot = (text) => {
	return get_cat_image()
		.then((img) => {
			img = img.replace(/^http:\/\//i, 'https://');
			console.log(img)
			return [
				{ type: 'text', text: '這是一張貓貓圖，之後可以指定屬性' },
				{ type: 'image', originalContentUrl: img, previewImageUrl: img },
			]
		})
}

module.exports = cat_line_bot;