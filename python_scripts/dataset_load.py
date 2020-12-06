import requests

cnt = 0
username = "user29@user.com"
password = "user29"
userinfo = {"username": username, "password": password}
login_url = "http://localhost:8080/login"
x = requests.post(login_url, data=userinfo)

cookies = x.cookies

book_post_url = "http://localhost:8080/api/books"

with open("books.csv") as f:
    for i in f:
        values = i.split(",")
        _, bookname, author, _, _, isbn13, _, pageNumber, _, _, publicationDate, publisher = values
        if isbn13 == "isbn13":
            continue
        #transforming "mm/dd/yyyy to yyyy-mm-dd
        m,d,y = publicationDate.split("/")
        #zfill function in order to achieve 02 instead of 2.
        publicationDate = "-".join([y.zfill(4),m.zfill(2),d.zfill(2)])

        book = {
            "bookname": bookname,
            "author": author,
            "pageNumber": pageNumber,
            "isbn": isbn13,
            "publicationDate": publicationDate,
            "publisher": publisher
        }
        print(bookname, author, isbn13, pageNumber, publicationDate, publisher)
        r = requests.post(book_post_url, json=book, cookies=cookies)
        print(r.status_code)
        cnt+=1
        if cnt==300:
            break
