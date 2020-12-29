import React, { Component } from 'react';
import axios from 'axios';


import { Layout } from 'antd';
import MainLogo from '../../../../images/mainpage-logo.svg';
import { Input } from 'antd';
import NavBarComp from "../../../navigation-bar/navigation-bar.js";
import './full-book.css';
const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = value => console.log(value);

class FullBook extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.match.params.isbn) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.isbn !== this.props.isbn)) {
                axios.get(`http://localhost:8080/api/books/?isbn=` + this.props.match.params.isbn,
                    {
                        withCredentials: true
                    })
                    .then(response => {
                        // console.log(response);
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }

    render() {
        let book = <p style={{ textAlign: 'center' }}></p>;
        if (this.props.isbn) {
            book = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            book = (
                <div className="FullBook">
                    <h1>{this.state.loadedPost.bookname}</h1>
                    <p>{this.state.loadedPost.author}</p>
                </div>

            );
        }
        return (
            <Layout style={{ height: "625px" }}>
                <Header className="header">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>
                    <div className="search-bar">
                        <Search className="search-bar-input" placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                </Header>
                <Layout>
                    <Sider className="site-layout-background" width={200} >
                        <NavBarComp/>
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {book}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default FullBook;