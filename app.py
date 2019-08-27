from flask import Flask
app = Flask(__name__)

# simple Flask demopy
@app.route("/")
def hello_world():
    return '<div>hello world, Welcome to my web!</div>'

# test requests
@app.route("/star_war")
def star_war():
	import requests
	starWarApi = 'https://swapi.co/api/people/1'
	r = requests.get(starWarApi)
	data = r.json()
	return '<div>It is star war api demo:</div><div>%s"s height is %s and  mass is %s, and has %s color hair</div>' % (data['name'], data['height'], data['mass'], data['hair_color'])

# test BeautifulSoup，BeautifulSoup為一文字解析套件
@app.route('/soup')
def soup():
	from bs4 import BeautifulSoup  
	html_text = """
		<html>  
			<head>
			<title >hello, world</title>
			</head>
			<body>
				<h1>BeautifulSoup</h1>
				<p class="bold">如何使用BeautifulSoup</p>
			</body>
		</html>  
	"""
	soup = BeautifulSoup(html_text, "html.parser")

	return '<div>爬一段HTML範例，標題是“%s”、主旨是“%s”</div>' % (soup.title.string, soup.p.string)

# 有這行才能直接執行 python main.py
if __name__ == "__main__":
    app.run()