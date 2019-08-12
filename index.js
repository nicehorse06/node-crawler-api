const express = require('express');
const tjc_linebotParser = require('./project_list/tjc/index')
const jimmy_assistant = require('./project_list/jimmy_assistant/index')

const app = express();

app.get('/', (req, res) => {
  res.send('wellcome my channel，此為chat bot的測試首頁!')
});

// for 個人 chatbot
app.post('/line/assistant', jimmy_assistant);

// for TJC 相關專案
app.post('/line/tjc', tjc_linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});