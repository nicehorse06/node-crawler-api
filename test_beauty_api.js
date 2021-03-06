const Ptt_img_crawler = require('./beauty_api')

// 測試表特版首頁的網址index數目
let test_get_last_page_index = () => {
	console.log('get_last_page_index 測試：')
	let ptt_img_crawler = new Ptt_img_crawler()
	ptt_img_crawler.get_last_page_index().then((x)=>{
		console.log('get_last_page_index不帶url_index時：',x)
	})

	ptt_img_crawler = new Ptt_img_crawler({
		url_index: 2000,
	})
	ptt_img_crawler.get_last_page_index().then((x)=>{
		console.log('get_last_page_index url_index帶2000時：',x)
	})

}
test_get_last_page_index()

// 測試給定一網址index得到此網址的所有文章的標題、連結、推文數
let test_get_articles_from_page = () => {
	let ptt_img_crawler = new Ptt_img_crawler()
	ptt_img_crawler.get_articles_from_page(3000).then((x)=>{
		console.log('test_get_articles_from_page的index帶3000時：',x)
	})
}
test_get_articles_from_page()

let test_push_num_parser = () => {
	let ptt_img_crawler = new Ptt_img_crawler()
	test_list = ['爆', 'X', '99', '40', '1', '0', '-1']
	test_list.forEach((item) => {
		console.log(`push_num_parser帶入${item}的轉換結果：`)
		console.log(ptt_img_crawler.push_num_parser(item))
	})
}
test_push_num_parser()

/*
	依據給定的url_index、page_index、push 回傳 對應的文章article
	回傳格式如下
	{
		url_index, // 該article的page在ptt url的index
		page_index, //該article在articles的index
		page_article_nums, // 該page所有文章的數目
		images 照片列表
		title 標題
		url 連結
		push 推文數
	}
*/
let test_beauty_image_api = () => {
	let ptt_img_crawler = new Ptt_img_crawler()
	ptt_img_crawler.beauty_image_api().then((article) => {
		console.log('beauty_image_api測試：',article)
	})
}
test_beauty_image_api()