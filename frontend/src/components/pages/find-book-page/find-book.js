import React, { Component } from "react";
import axios from 'axios';
import './find-book.css';
import { Layout } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { NavLink } from "react-router-dom";
import { Row, Col } from 'antd';
const { Search } = Input;

const { Header, Sider } = Layout;

export default class FindBook extends Component {
    state = {
        loadedPost: [],
        notfound: "",
        addbook: "",
    };
    onSearch = value => {
        axios.get(`http://localhost:8080/api/books/?isbn=` + value,
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response);
                if (response.data) {
                    this.setState({ loadedPost: response.data });
                }
                else {
                    this.setState({ notfound: "Book is not found :(", addbook: "If you want, you can add this book to ReaderWorld!" });
                    document.getElementById("add-book").style.display = "inline-block";
                }


            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });

    }
    onSearchName = value => {
        axios.get(`http://localhost:8080/api/books/search/?bookname=` + value,
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response);
                if (response.data) {
                    this.setState({ loadedPost: response.data });
                }
                else {
                    this.setState({ notfound: "Book is not found :(", addbook: "If you want, you can add this book to ReaderWorld!" });
                    document.getElementById("add-book").style.display = "inline-block";
                }


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
        // books = this.state.books.map((book, i) => {
        //     return (
        //         <Link to={'/' + book.isbn} key={i}>
        //             <Book
        //                 key={i}
        //                 isbn={book.isbn}
        //                 bookname={book.bookname}
        //                 author={book.author}
        //                 clicked={() => this.bookSelectHandler(book.isbn)} />
        //         </Link>
        let book = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.loadedPost) {
            book = this.state.loadedPost.map((book, i) => {
                return (
                    <Link to={'/' + book.isbn} key={i}>
                        <div className="book-content" key={i} onClick={() => this.bookSelectHandler(book.isbn)} >
                            <img src={"http://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg?default=false"} alt="" style={{ width: "auto", maxWidth:"50%" }} id="imageBox" />
                            <h1>{book.bookname}</h1>
                            <p>{book.author}</p>

                        </div>
                    </Link>
                );
            });
        }
        else {
            book = (
                <div className="not-found-content" style={{ marginTop: "2rem" }}>
                    <h1 className="not-found-title">{this.state.notfound}</h1>
                    <NavLink id="add-book" style={{ display: "none" }} className="add-book-link" to="/add-book" exact>{this.state.addbook}</NavLink>
                </div>
            )
        }
        return (
            <Layout style={{ minHeight: "600px" }}>
                <Header className="header">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>

                </Header>
                <Layout>
                    <Sider className="site-layout-background" width={200} >
                        <NavBarComp />
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Row style={{ textAlign: "center" }}>
                            <Col span={12}>
                                <h1 style={{ fontSize: "large" }}> Find Book with isbn!</h1>
                                <Search placeholder="type ISBN" onSearch={this.onSearch} className="search-input" />
                            </Col>
                            <Col span={12}>
                                <h1 style={{ fontSize: "large" }}> Find Book with name!</h1>
                                <Search placeholder="type name" onSearch={this.onSearchName} className="search-input" />
                            </Col>
                        </Row>
                        <div className="found-books">
                            {book}
                        </div>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
