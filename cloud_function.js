/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 
package.json
{
	"name": "ptt-beauty-img",
		"version": "0.0.1",
			"dependencies": {
		"cheerio": "^1.0.0-rc.2",
			"node-fetch": "^2.2.0"
	}
}

測試使用範例JSON
{
     "message": 
     {
         "url_index": "3130",
         "page_index": "2",
         "push": "50"
     }
   
 }
*/

exports.ptt_img_crawler = (req, res) => {
	let message = req.query.message || req.body.message || 'Hello World!';

	const raw_fetch = require('node-fetch')
	const cheerio = require('cheerio')

	const ptt_url = 'https://www.ptt.cc'
	const beauty_url = 'https://www.ptt.cc/bbs/Beauty/index.html'
	const LAST_URL_INDEX = 'LAST_URL_INDEX'
	const fetch = (url) => {
		return raw_fetch(url, { headers: { 'Cookie': 'over18=1;' } })
	}
	class Ptt_img_crawler {
		constructor({ url_index = -1, page_index = 0, push = 0 } = {}) {
			// 如https://www.ptt.cc/bbs/Beauty/index2620.html，url_index為2620
			this.url_index = Number(url_index) || 0 // 如果 url_index 小於 0，則使用class裡的方法取得 index
			// 該網址中，第幾個文章
			this.page_index = Number(page_index)
			// 過濾推文數
			this.push = Number(push)
			// 該page所有文章的數目
			this.page_article_nums = 0
			// 最後beauty_image_api回傳的圖片列表
			this.article = {}
			// 用來記錄已檢查符合條件的頁面數量
			this.last_page_counter = 0
		}

		get_last_page_index() {
			// 功能為得到表特版首頁的index數目，如 https://www.ptt.cc/bbs/Beauty/index2620.html 的2620
			// 目前開發階段先回傳前一頁的index數目
			if (this.url_index < 0) {
				return fetch(beauty_url)
					.then(response => response.text())
					.then((body) => {
						var $ = cheerio.load(body);
						// 得到上一頁的 url_index
						let pre_url_index = $('.btn-group-paging a').eq(1).attr('href').match(/\d+/)[0];
						// 得到最新頁面的 url_index
						this.url_index = Number(pre_url_index) + 1
						return this.url_index
					})
			}
			// 此函式為第一個 Promise 回傳，需要建立 Promise 物件
			return new Promise((resolve, reject) => {
				resolve(this.url_index)
			})
		}

		get_articles_from_page(index = 0) {
			// 得到某一頁面的文章列，參數有頁面index, 回傳該頁的的資訊，所有文章的標題、超連結、推文數
			return fetch(`https://www.ptt.cc/bbs/Beauty/index${index}.html`)
				.then(response => response.text())
				.then((body) => {
					var $ = cheerio.load(body)
					var articles = $('.r-ent').map((index, obj) => {
						let raw_push = $(obj).find('span.f3').text()
						return {
							title: $(obj).find('div.title a').text(),
							url: ptt_url + $(obj).find('a').attr('href'),
							push: this.push_num_parser(raw_push),
						}
					}).get()

					// 順序相反，符合PTT最新的貼文在最下方的慣例
					return articles.reverse()
				})
		}

		// 把推文數轉換成數字
		push_num_parser(push_status) {
			if (push_status) {
				if (push_status.match(/爆/)) {
					return 100
				} else if (push_status.match(/X/)) {
					return -1
				} else {
					return Number(push_status)
				}
			} else {
				return 0
			}
		}

		get_beauty_image(url) {
			/* 
				抓取文章中的圖片
				傳入某一article的網址
				回傳該頁圖片網址列表
			*/
			return fetch(url)
				.then(response => response.text())
				.then((body) => {
					let images = []

					// twitter圖片的正則表達式 "https://pbs.twimg.com/media/DllH7W8VsAI11fj.jpg"
					let twitter_images = body.match(/pbs.twimg.com\/media\/.{15}/g)
					if (twitter_images) {
						images = images.concat(twitter_images)
					}

					// ptt 的imgur圖片有以下三種
					// (1)https://imgur.com/vMskkAo.jpg (2)https://i.imgur.com/vMskkAo.jpg (3)https://imgur.com/vMskkAo
					let imgur_images = body.match(/imgur.com\/[0-9a-zA-Z]{7}/g);
					if (imgur_images) {
						images = images.concat(imgur_images)
					}

					// PTT網站中有重複連結，用Set去除重複
					images = [...new Set(images)]

					// LINE bot 要求要 https 網址，有一些PTT圖片會是HTTP，故在此加上
					return images.map((img) => {
						return `https://${img}.jpg`
					})
				})
		}

		// 參數用物件才有辦法設置多個默認參數，實際呼叫抓取ptt的函示
		beauty_image_api() {
			/*
			  回傳 article
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
			return this.get_last_page_index() // 回傳最新頁面的 url_index
				.then(this.get_articles_from_page.bind(this)) // 依據 url_index 回傳 pages
				.then(articles => {
					//過濾掉非正妹文、空白文、公告
					return articles.filter(obj => obj.title.match(/正妹/))
				})
				.then(articles => {
					// 過濾推文數
					let push_nums = this.push
					if (push_nums > 80) {  // 怕要抓很久把最高推數改為80
						push_nums = 80
					}
					return articles.filter(obj => obj.push >= push_nums)
				})
				.then(articles => {
					// 至此處已過濾完該page的的article，可得該頁文章數量
					// 並把指定的article存到this裡，並回傳該頁的url
					this.page_article_nums = articles.length
					this.article = articles[this.page_index]
					if (this.article) {
						return this.article.url
					} else {
						// 當該page index大於該page的article數量時，改查詢前一個 url_index
						throw new Error(LAST_URL_INDEX)
					}
				})
				.then(this.get_beauty_image.bind(this))
				.catch((err) => {
					if (err.message === LAST_URL_INDEX) {
						// 如果沒有抓到任何文章，就回到上一頁做遞迴
						if (this.last_page_counter > 100) {
							// 防止一直找不到符合文章的無窮迴圈
							throw new Error('可能沒有該文章喔')  // todo 寫一個顯示訊息回傳到 LINE上
						}
						this.last_page_counter += 1
						this.url_index -= 1
						return this.beauty_image_api()
					} else {
						throw new Error(err.message)
					}
				})
				.then((images) => {
					let article = this.article
					// 準備文章發出，重新計算上一頁抓取數量
					this.last_page_counter = 0
					// 此處的 article 宣告如果沒有加 let 會報錯
					if (article.url_index) {
						return article
					} else {  // 把當頁資訊封裝到 article 中
						article.url_index = this.url_index
						article.page_index = this.page_index
						article.page_article_nums = this.page_article_nums
						article.images = images
						return article
					}
				})
				.catch((err) => console.log('crawler error:', err.message))
		}
	}

	// 實例化，並帶入參數
	let ptt_img_crawler = new Ptt_img_crawler({
		url_index: message.url_index,
		page_index: message.page_index,
		push: message.push
	})

	ptt_img_crawler.beauty_image_api().then((article) => {
		res.status(200).send(article);
	})
};
