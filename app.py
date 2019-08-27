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

# 有這行才能直接執行 python main.py
if __name__ == "__main__":
    app.run()