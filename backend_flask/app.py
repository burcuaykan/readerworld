from flask import Flask, request

app = Flask(__name__)


@app.route("/bookname", methods=["GET", "POST"])
def hello_world():
    if request.method == "POST":
        content = request.get_data()
        return content
    return "Book Page"


if __name__ == '__main__':
    app.run()
