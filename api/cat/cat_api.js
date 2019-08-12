//The Cat API official web url: https://thecatapi.com/docs.html
const fetch = require('node-fetch')

const url = 'http://thecatapi.com/api/images/get'

const get_cat_image = () => {
	return fetch(url, { method: 'get' })
		.then(res => res.url)
		.catch(err => console.error(err))
}

module.exports = get_cat_image;