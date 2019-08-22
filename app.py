from flask import Flask
app = Flask(__name__)

# simple Flask demopy
@app.route("/")
def hello_world():
    return 'hello world, Welcome to my web!'

# 有這行才能直接執行 python main.py
if __name__ == "__main__":
    app.run()