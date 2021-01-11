import React, { Component } from "react";
import axios from 'axios';
import './find-book.css';
import { Layout } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import { Input } from 'antd';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
const { Search } = Input;

const { Header, Content, Sider } = Layout;

export default class FindBook extends Component {
    state = {
        loadedPost: null,
        notfound: ""
    };
    onSearch = value =>{
        axios.get(`http://localhost:8080/api/books/?isbn=` + value,
                        {
                            withCredentials: true
                        })
                        .then(response => {
                            console.log(response);
                            if(response.data){
                                this.setState({ loadedPost: response.data });
                            }
                            else{
                                this.setState({ notfound: "Book is not found :(" });
                            }
                            
                            
                        })
                        .catch(err => {
                            this.setState({
                                error: err
                            });
                        });
         
    }
    render() {
        let book = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.loadedPost) {
            book = (
                <div className="FullBook">
                    <img src={"http://covers.openlibrary.org/b/isbn/" + this.state.loadedPost.isbn + "-L.jpg?default=false"} alt="" style={{ width: "20%" }} id="imageBox" />
                    <h1>{this.state.loadedPost.bookname}</h1>
                    <p>{this.state.loadedPost.author}</p>
                </div>

            );
        }
        else{
            book = (
                <div className="not-found-content" style={{marginTop: "2rem"}}>
                    <h1 className="not-found-title">{this.state.notfound}</h1>
                </div>
            )
        }
        return (
            <Layout style={{ minHeight:"600px" }}>
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
                        <Content style={{textAlign: "center"}}>
                            <h1 style={{fontSize: "large"}}> Find Book with isbn!</h1>
                            <Search placeholder="type isbn" onSearch={this.onSearch} enterButton className="search-input" />
                            {book}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
