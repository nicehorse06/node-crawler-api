const Ptt_img_crawler = require('../../../api/ptt_beauty/ptt_beauty_crawler')
const { parseQuery } = require('../../../util/parse_query')
const { keyword } = require('../../../keyword')

/* 
預期完成功能
	LINE BOT 起始template選項 1.推文100以上 2.推文50以上 3.推文10以上 4.不管推文數
	
	點選之後傳入最新文章的前三張照片
	再給提示template 1.繼續看下面三張 2.我要看下一篇文章圖片 3. 我要看上一篇文章圖片 4.重新查看最新文章

	要新增單元測試

*/
// todo 之後要有一個管裡 key word的機制

const beauty_line_bot = (text) => {
	let response_list = []
	let button_template = {
		type: 'template',
		altText: '表特圖片功能選單',
		template: {
			type: 'buttons',
			title: 'PTT 表特版',
			text: '建議不要在公共場所看表特版、如果有圖文不符的圖可能是其他鄉民的推文',
			actions: []
		}
	}
	let image_carousel = {
		"type": "template",
		"altText": "電腦不完全支援看圖片啦 \n＊此訊息在智慧裝置上能獲得最好的體驗",
		"template": {
			"type": "image_carousel",
			"columns": []
		}
	}
	if (text === keyword.BEAUTY) {
		// 當關鍵字一模一樣時，表示第一次進入表特選單

		button_template.template.actions.push({
			type: 'message',
			label: `來看表特`,
			text: `beauty?init_img=0&step=10`
		})
		button_template.template.actions.push({
			type: 'message',
			label: `看10推以上的正妹啦`,
			text: `beauty?push=10&step=10`
		})
		button_template.template.actions.push({
			type: 'message',
			label: `看50推以上的正妹啦`,
			text: `beauty?push=50&step=10`
		})
		response_list.push(button_template)
		return new Promise((resolve, reject) => {
			resolve(response_list)
		})
	} else {
		// 當有關鍵字參數時
		queryString = text.split('?')[1]
		queryJson = parseQuery(queryString)

		let para_satus = ''

		if (queryJson.push) {
			para_satus += `&push=${queryJson.push}`;
		}

		if (queryJson.step) {
			para_satus += `&step=${queryJson.step}`;
		}

		const ptt_img_crawler = new Ptt_img_crawler({
			url_index: queryJson.url_index,
			page_index: queryJson.page_index,
			push: queryJson.push
		})

		return ptt_img_crawler.beauty_image_api().then((article) => {

			let images = article.images
			let init_img = Number(queryJson.init_img) || 0 // 起始相片  把參數連結到這
			let step = Number(queryJson.step) || 10 // 吐出來的相片數量，預設為十張
			let end_img = init_img + step // 結尾數量

			// 抓取如果數量超出總圖片的可能，沒有圖片的 images 為 []
			if (end_img >= images.length) {
				end_img = images.length
			}

			// 傳送圖片後的文字敘述
			button_template.template.text = `${article.title}，此文${article.push}推，一共有${images.length}張表特圖，以上為第${init_img + 1}到${end_img}張`

			// 預設使用 image_carousel 展示圖片
			if (true) {
				images.slice(init_img, end_img)
					.forEach(img => {
						image_carousel.template.columns.push(
							{
								"imageUrl": img,
								"action": {
									"type": "uri",
									"label": "點擊看全圖",
									"uri": img
								}
							}
						)
					})
				// 如果沒圖片放進 image_carousel 會出錯
				if (image_carousel.template.columns.length != 0) {
					response_list.push(image_carousel)
				}
			} else {
				images.slice(init_img, end_img)
					.forEach(img => {
						response_list.push({ type: 'image', originalContentUrl: img, previewImageUrl: img })
					})
			}

			// 控制看完圖片的狀態
			if (end_img === images.length) {
				button_template.template.actions.push({
					type: 'message',
					label: `沒圖了，重看!`,
					text: `beauty`
				})
			} else {
				button_template.template.actions.push({
					type: 'message',
					label: `再來${step}張`,
					text: `beauty?init_img=${end_img}&page_index=${article.page_index}&url_index=${article.url_index}${para_satus}`
				})
			}

			button_template.template.actions.push({
				type: 'uri',
				label: `此表特文網站連結`,
				uri: article.url
			})

			if (article.page_index > 0) {
				button_template.template.actions.push({
					type: 'message',
					label: `看上一篇文章的表特圖`,
					text: `beauty?page_index=${Number(article.page_index) - 1}&url_index=${article.url_index}${para_satus}`
				})
			}

			if (article.page_index + 1 < article.page_article_nums) {
				button_template.template.actions.push({
					type: 'message',
					label: `看下一篇文章的表特圖`,
					text: `beauty?page_index=${Number(article.page_index) + 1}&url_index=${article.url_index}${para_satus}`
				})
			} else {
				button_template.template.actions.push({
					type: 'message',
					label: `看下一篇文章的表特圖`,
					text: `beauty?page_index=0&url_index=${article.url_index - 1}${para_satus}`
				})
			}

			response_list.push(button_template)
			return response_list
		})
			.catch((err) => {
				// 如果有錯誤
				response_list.push({
					type: 'text',
					text: err.message
				})
				button_template.template.actions.push({
					type: 'message',
					label: `可能有錯誤，重做上一步跟回報Jimmy`,
					text: `beauty`
				})
				response_list.push(button_template)
				return response_list
			})
	}
}

module.exports = beauty_line_bot;