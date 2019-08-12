const { NearestCity } = require('../../util/closest-location.js')
const church_list = require('./church_list.json').church_list
const church_geo_list = require('./church_geo_list.json')

const search_nearest_church = (latitude, longitude) => {
	// nearest_location 的資料結構為 [ 216, 22.02659, 121.54245999999999 ] => [id, latitude, longitude]
	const nearest_location = NearestCity(latitude, longitude, church_geo_list)
	const nearest_id = nearest_location[0]
	const nearest_church = church_list[nearest_id]

	// church_list 的經緯度沒有小數點 不能直接用
	nearest_church.geo_latitude = church_geo_list[nearest_id][1]
	nearest_church.geo_longitude = church_geo_list[nearest_id][2]

	return nearest_church
}

module.exports = search_nearest_church