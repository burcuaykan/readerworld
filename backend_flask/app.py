from flask import Flask, request
import easyocr
from image_to_string import image_to_list
app = Flask(__name__)
from PIL import Image
from numpy import asarray


@app.route("/bookname", methods=["GET", "POST"])
def hello_world():
    if request.method == "POST":
        content = request.get_data()
        return content
    return "Book Page"

@app.route("/upload", methods=["GET", "POST"])
def book_upload():
    if request.method == "POST":
        image = request.files.get('file')
        img = Image.open(image)
        data = asarray(img)

        words = image_to_list(data)
        return {"words" : [{str(x):words[x] for x in range(len(words))}], "size" : len(words)}

    return "Book Page"



if __name__ == '__main__':
    app.run(host="144.122.71.130", port=8082, debug=True)
