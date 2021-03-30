import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Book from '../../../book/book';
import { Pagination } from 'antd';
import './books.css';
import { animateScroll as scroll } from 'react-scroll';

class Books extends Component {
    state = {
        books: [],
        pageSize: 20,
        page: 1
    }


    componentDidMount() {
        axios.get(`http://localhost:8080/api/books/all`,
            {
                withCredentials: true
            })
            .then(res => {
                //const books = res.data.slice(6, 16);

                this.setState({
                    books: res.data,
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
    scrollToTop = () => {
        scroll.scrollToTop();
    }
    handlePageChange = (page) => {
        this.setState({
            page: page + 1
             
    });

        this.scrollToTop();
    }
renderPosts = () => {
    const start = (this.state.page - 1) * this.state.pageSize;
    const end = start + this.state.pageSize;


    return (
        <div className="row">
            {
                this.state.books.slice(start, end).map((book, i) => {
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
                })
            }
        </div>
    );
}
render() {
    let books = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
        // books = this.state.books.map((book, i) => {
        books = this.renderPosts()
        // return (
        //     // <Link to={'/' + book.isbn} key={i}>
        //     //     <Book
        //     //         key={i}
        //     //         isbn={book.isbn}
        //     //         bookname={book.bookname}
        //     //         author={book.author}
        //     //         clicked={() => this.bookSelectHandler(book.isbn)} />
        //     // </Link>
        //     this.renderPosts()
        // );
        // });
    }
    return (
        <section className="Books">
            {books}
            <Pagination
                defaultCurrent={1}
                defaultPageSize={this.state.pageSize}
                total={this.state.books.length}
                showSizeChanger={false}
                onChange={(page) => this.handlePageChange(this.state.page)}
            />
        </section>
    )
}
}
export default Books;