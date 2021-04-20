# save this as app.py
from flask import Flask, escape, request

app = Flask(__name__)



@app.route('/bookname', methods=["GET", "POST"])
def bookname():
    if request.method == "POST":
        content = request.get_data()
        return content
    else:
        return "Book Page"