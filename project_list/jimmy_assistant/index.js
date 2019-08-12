const linebot = require('linebot');
const { token } = require('../../config')
const text_response = require('./text_response')

const bot = linebot({
  channelId: token.channel.id,
  channelSecret: token.channel.secret,
  channelAccessToken: token.channel.accessToken
});

// 待做 api 
// 狗狗 血統參數
// 貓貓 https://thecatapi.com/docs.html
// 查克．羅禮士(Chuck Norris) api  https://api.chucknorris.io/

// 處理 message 事件
bot.on('message', function (event) {
  // 需要打印訊息確定送來的型態
  console.log('使用者發送訊息：', event.message)

  // 訊息型態為文字
  if (event.message.type === 'text') {
    const text = event.message.text;
    text_response(text).then(event.reply)
      .catch(function (error) {
        // error 
        console.log(`錯誤訊息 ${error}`);
      });
  } else if (event.message.type === 'location') {
    event.reply({
      type: 'location',
      title: '位置測試功能，目前開發中',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203
    });
  } else {
    let res = `目前僅接受文字訊息，請隨意輸入文字`
    event.reply(res).then(function (data) {
      // success 
      console.log(res);
    }).catch(function (error) {
      // error 
      console.log(`錯誤訊息 ${error}`);
    });
  }
});

// 驗證數位簽章並解析JSON物件
const jimmy_assistant = bot.parser();

module.exports = jimmy_assistant;