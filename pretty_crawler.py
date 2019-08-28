import requests
from bs4 import BeautifulSoup
import urllib3

# 取消requests警告，參閱https://stackoverflow.com/questions/27981545/suppress-insecurerequestwarning-unverified-https-request-is-being-made-in-pytho
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ptt_over_18_url = 'https://www.ptt.cc/ask/over18'
ptt_beauty_url = 'https://www.ptt.cc/bbs/Beauty/index.html'
'''ptt表特爬蟲 參數 
url_index：如網址後3039的 https://www.ptt.cc/bbs/Beauty/index3039.html
page_index: 該URL底下的第幾篇文章
push: 幾推以上
step: 此推文的前幾張照片
'''
payload = {
	'from': '/bbs/Beauty/index.html',
	'yes': 'yes'
}
rs = requests.session()
#  繞過ptt表特版的18歲限制，參考https://www.youtube.com/watch?v=G5MDpnGsE-k
r = rs.post(ptt_over_18_url, verify=False, data=payload)
r = rs.get(ptt_beauty_url, verify=False)

# 現已可看到表特版首頁
print(r.text)