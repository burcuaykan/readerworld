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
        axios.get(`http://localhost:8080/api/books/all`,
            {
                withCredentials: true
            })
            .then(res => {
                const books = res.data.slice(6, 16);
         
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
                            isbn={book.isbn}
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