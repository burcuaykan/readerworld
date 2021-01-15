import React, { Component } from "react";
import { Layout} from 'antd';
import "./profile.css";
import MainLogo from '../../../images/mainpage-logo.svg';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { Row, Col } from 'react-bootstrap';
import { Input } from 'antd';
import axios from 'axios';
import BooksPage from '../main-page/books/books.js'
import { NavLink } from "react-router-dom";

import {Button } from 'antd';

import Khaleesi from '../../../images/khaleesi.png';



const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = value => console.log(value);

export default class ProfileContent extends Component {
    state = {
        loadedPostUser: null,
        loadedPostReadList: [],
        notfound: ""
    };
    

    componentDidMount() {
        console.log(this.props);
        
        axios.get(`http://localhost:8080/api/books/readlist/`,
        {
            withCredentials: true
        })
        .then(response => {
            
            console.log(response.data);
                // const data = res.data.slice(0, 4);
                const readlist = response.data.map(readlist =>
                     <div key={readlist.isbn}>
                          {/* <img src={} alt="" /> */}
                         <p>- {readlist.bookInformation.bookname}</p>

                     </div>);
                // )
                this.setState({
                    loadedPostReadList: readlist,
                    error: null
                });
            
        })
        .catch(err => {
            this.setState({
                error: err
            });
        });

        axios.get(`http://localhost:8080/api/users/`,
        {
            withCredentials: true
        })
        .then(response => {
            console.log(response);
            if(response.data){
                this.setState({ loadedPostUser: response.data });
            }
            else{
                this.setState({ notfound: "User is not found :(" });
            }
            
            
        })
        .catch(err => {
            this.setState({
                error: err
            });
        });

        
            
    }
    render() {
        //const imgsrc = Khaleesi;
        //const name = "Daenerys Targaryen";
        //const username = "@khaleesi";
        //const bio = "I love reading books and comment about them as I read. “When you play the game of thrones, you win or you die. There is no middle ground.” — George R. R. Martin";
        
        let user = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.loadedPostUser) {
            user = (
                <div>
                    <p className="user-name">{this.state.loadedPostUser.email}</p>
                </div>

            );
        }
        else{
            user = (
                <div style={{marginTop: "2rem"}}>
                    <h1>{this.state.notfound}</h1>
                </div>
            )
        }
        let readlist = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.loadedPostReadList) {
            readlist = (
                <div>
                    <p className="book-names">{this.state.loadedPostReadList}</p>
                </div>

            );
        }
        else{
            readlist = (
                <div style={{marginTop: "10rem"}}>
                    <p className="book-names">{this.state.notfound}</p>
                </div>
            )
        }
        return (
            <Layout style={{ height: "auto" }}>
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
                            paddingLeft:7,
                            paddingRight:7,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Row className="bio-row">
                                {/*<img src={imgsrc} alt="" className="footer-image" style={{ height:"10%", width: "10%", paddinTop:"26px", paddingBottom: "0px", marginRight: "10px", marginTop: "10px" }}/>*/}
                            <Col>
                                <p className="user-name" > {user}</p>
                                {/*<p className="username" > {username}</p>*/}

                                {/*<p style={{fontSize:"12px", paddingTop:"0px", margin:"0" }} > burcuaykan13@gmail.com</p>*/}
                                {/*<p className="bio"> {bio} </p>*/}

                            </Col>

                        </Row>
                        <Row>
                        <div className="container-grid">
                            
                            <div className="list-col">
                                <Col className="list-col">
                                    
                                    <p className="lists" > Lists</p>
                                    <Col className="mini-list-col">
                                        <p className="mini-lists" > Finished</p>
                                        <p className="book-names" > {readlist} </p>
                                        <NavLink to="/main-page" exact> <Button className="add-book-button"> Add new book </Button></NavLink>
                                    
                                    </Col>
                                    
                                </Col>
                            </div>
                           
                            <div className="content-col">
                                <p className="comments" > Comments</p>
                                <Row className="comment-row">
                                    <Col>
                                       
                                        <p className="comment-book-name" >Ready Player Two</p>
                                        <p className="profile-comment-rating" >Rating: 2.3</p>                                    
                                        <p className="profile-comments" >
                                            This was easily my biggest disappointment for the year. I truly enjoyed "Ready Player One" but I didn't like this one.
                                        </p>
                                    </Col>
                                    
                                </Row>
                                
                            </div>
                            
                        </div>
                        </Row>                            
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        );
    }
}
