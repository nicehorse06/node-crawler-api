// Dog API official web url: https://dog.ceo/dog-api/
const fetch = require('node-fetch')

const dog_url = 'https://dog.ceo/api/breeds/image/random'

const get_dog_image = () => {
  return fetch(dog_url, {method: 'get'})
    .then(res => res.json())
    .then(data => data.message )
    .catch(err => console.error(err))
}

module.exports = get_dog_image;