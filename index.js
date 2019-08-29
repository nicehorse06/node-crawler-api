const express = require('express');
const Ptt_img_crawler = require('./beauty_api')

const app = express();

app.get('/', (req, res) => {
  res.send('wellcome my channel，此為chat bot的測試首頁!')
});

// 表特版api接口，可想更多參數
app.get('/ptt_beauty/:url_index/:page_index/:push', (req, res) => {
  // 用這邊的方法取得express內建的參數讀取
  console.log(req.params)
  // 或用這邊的方法解析參數
  console.log(req.url)

  let ptt_img_crawler = new Ptt_img_crawler(req.params)
  ptt_img_crawler.beauty_image_api().then((article) => {
    console.log('測試用log：', article)
    res.send(article)
  })
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});