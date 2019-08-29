const Ptt_img_crawler = require('./beauty_api')

let test_get_last_page_index = () => {
	console.log('get_last_page_index 測試：')
	let ptt_img_crawler = new Ptt_img_crawler()
	ptt_img_crawler.get_last_page_index().then((x)=>{console.log('不帶url_index時：',x)})

	ptt_img_crawler = new Ptt_img_crawler({
		url_index: 2000,
	})
	ptt_img_crawler.get_last_page_index().then((x)=>{console.log('url_index帶2000時：',x)})

}
test_get_last_page_index()