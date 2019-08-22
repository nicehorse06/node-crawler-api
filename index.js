const express = require('express');
const jimmy_assistant = require('./project_list/jimmy_assistant/index')
const Ptt_img_crawler = require('./api/ptt_beauty/ptt_beauty_crawler')

const app = express();

app.get('/', (req, res) => {
  res.send('wellcome my channel，此為chat bot的測試首頁!')
});

const pretty_api = () => {
  const ptt_img_crawler = new Ptt_img_crawler({
    url_index: 2000,
    page_index: 0,
    push: 0
  })
  console.log('qwerty')
  return ptt_img_crawler.beauty_image_api().then((article) => {
    return article
  }).catch(() => {})

}

app.get('/pretty', (req, res) => {
  res.send('wellcome my channel，此為chat bot的測試首頁!')
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});