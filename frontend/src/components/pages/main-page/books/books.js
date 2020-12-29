import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Book from '../../../book/book';
import './books.css';

class Books extends Component {
    state = {
        books: []
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/api/books/random`,
            {
                withCredentials: true
            })
            .then(res => {
                 console.log(res.data);
                // const data = res.data.slice(0, 4);
                const books = res.data.slice(0, 4);
                // const books = data
                // const books = data.map(book =>
                //     <div key={book.isbn}>
                //          {/* <img src={} alt="" /> */}
                //         <p>{book.author}</p>
                //         <p>{book.bookname}</p>

                //     </div>
                // )
                this.setState({
                    books: books,
                    error: null
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }
    bookSelectHandler = (isbn) => {
        this.setState({ selectedPostIsbn: isbn });
    }
    render() {
        let books = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            books = this.state.books.map((book, i) => {
                return (
                    <Link to={'/' + book.isbn} key={i}>
                        <Book
                            key={i}
                            bookname={book.bookname}
                            author={book.author}
                            clicked={() => this.bookSelectHandler(book.isbn)} />
                    </Link>
                );
            });
        }
        return (
            <section className="Books">
                {books}
            </section>
        )
    }
}
export default Books;