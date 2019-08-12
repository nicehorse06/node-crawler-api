const church_list = require('./church_list.json').church_list
var fs = require('fs');

/*
該專案網址：https://github.com/cameronbourke/closest-location
closest-location 專案所需的格式為下

var locations = [
	['台北教會', 25.0418432, 121.52635110000006
	],
	['信義祈禱所', 25.029739, 121.563333],
	['松山教會', 25.051131, 121.567822]
]
*/

let to_geo_format = (number) => {
	return number * 0.000001
}

let locations_list = []
for (let i = 0; i < church_list.length; i++) {
	locations_list.push([i, to_geo_format(church_list[i]._latitude), (church_list[i]._longitude)])
}

// 把church_list.json傳存成church_geo_list.json格式
fs.writeFile("./church_geo_list.json", JSON.stringify(locations_list), function (err) {
	if (err) {
		return console.log(err);
	}
	console.log("The file was saved!");
}); 