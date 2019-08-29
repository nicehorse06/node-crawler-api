const Ptt_img_crawler = require('./beauty_api')

// api demo
const ptt_img_crawler = new Ptt_img_crawler({
	url_index: 2000,
	page_index: 2,
	push: 0
})

ptt_img_crawler.beauty_image_api().then((article) => {
	console.log(article)
	return article
}).catch(() => {

})