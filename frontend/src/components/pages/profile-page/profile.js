import React, { Component } from "react";
import { Layout} from 'antd';
import "./profile.css";
import MainLogo from '../../../images/mainpage-logo.svg';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { MenuOutlined } from '@ant-design/icons';

import {Button } from 'antd';


const { Header, Content, Sider } = Layout;


export default class ProfileContent extends Component {
    state = {
        loadedPostUser: null,
        loadedPostReadList: [],
        notfound: "",
        comments: [],
        rates: [],
        isSmallMenuHidden: true
    };
    
    openSmallMenu = () => {
        window.scrollTo(0, 0);
        this.setState({
            isSmallMenuHidden: !(this.state.isSmallMenuHidden)
        });
    }

    closeSmallMenu = () => {
        document.body.style.overflowY = "auto";
        this.setState({
            isSmallMenuHidden: !(this.state.isSmallMenuHidden)
        });
    }
    async componentDidMount() {
        console.log(this.props);

        await axios.get(`http://localhost:8080/api/users/`,
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
        
        
        axios.get(`http://localhost:8080/api/books/readlist`,
        {
            withCredentials: true
        })
        .then(response => {
            
            console.log(response.data);
                const readlists = response.data.map(readlist =>
                     <div className="comment-container" key={readlist.isbn}>
                        <p> <p className="comment-body"> Book name: </p> {readlist.bookInformation.bookname}</p>
                         <p><p className="comment-body"> Deadline: </p> {readlist.deadline}</p>
                      

                     </div>);
                // )
                this.setState({
                    loadedPostReadList: readlists,
                    error: null
                });
            
        })
        .catch(err => {
            this.setState({
                error: err
            });
        });

        axios.get(`http://localhost:8080/api/books/comment/`,
        {
            withCredentials: true
        })
        .then(response => {
            
            console.log(response.data);
                const comments = response.data.map(comment =>
                     <div className="comment-container" key={comment.isbn}>
                        <p> <p className="comment-body"> Book isbn: </p> {comment.isbn}</p>
                         <p><p className="comment-body"> Comment: </p> {comment.commentBody}</p>
                      

                     </div>);
                // )
                this.setState({
                    comments: comments,
                    error: null
                });
            
        })
        .catch(err => {
            this.setState({
                error: err
            });
        });

        
        if(this.state.loadedPostUser){
            
            axios.get('http://localhost:8080/api/books/vote' ,
            {
                withCredentials: true
            })
            .then(response => {
                
                console.log(response.data);
                    const rates = response.data.map(rate =>
                        <div className="comment-container" key={rate.isbn}>
                            <p> <p className="comment-body"> Book isbn: </p> {rate.isbn}</p>
                            <p><p className="comment-body"> Rate: </p> {rate.vote}</p>
                        
                        </div>);
                    // )
                    this.setState({
                        rates: rates,
                        error: null
                    });
                
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
        }
        else{
           const rates = <div className="comment-container" >
           <p> <p className="comment-body"> Book isbn :</p> 1111111</p>
           <p><p className="comment-body"> rate :</p> 10</p>
       
       </div>
            this.setState({
                rates: rates,
                error: null
            });
        }   
        
            
    }
    render() {
        
        let user = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.loadedPostUser) {
            user = (
                <div className="bio-row">
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
        let comment = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.comments) {
            comment = (
                <div>
                    <p >{this.state.comments}</p>
                </div>

            );
        }
        let rate = <p style={{ textAlign: 'center' }}></p>;
        if (this.state.rates) {
            rate = (
                <div>
                    <p >{this.state.rates}</p>
                </div>

            );
        }
        return (
            <Layout style={{ height: "1024px" }}>
            <Header className="header d-none d-md-block">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>
                </Header>
                <Header className="header d-block d-md-none">
                    <div className="logo" style={{ float: "left", display: "contents" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>
                    <Button className="small-menu-btn d-block d-md-none" type="link" style={{ float: "right" }} onClick={this.openSmallMenu}><MenuOutlined /></Button>
                    <div hidden={this.state.isSmallMenuHidden} className="d-block d-md-none header-small-menu">

                        <NavBarComp />
                    </div>
                </Header>
            <Layout>
                <Sider className="site-layout-background d-none d-md-block" width={200} >
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
                        <Row >
                        <div className="container-grid">
                        <div className="content-col">
                        {user}
                            </div>
                            </div>
                        </Row>
                        <Row>
                        <div className="container-grid">                            
                            <div>
                                <Col className="list-col">
                                    <p className="lists" > Readlist</p>
                                    <p className="book-names" > {readlist} </p>
                                    <p></p>
                                    <NavLink to="/main-page" exact> 
                                        <Button className="add-book-button"> 
                                            Add new book
                                        </Button>
                                    </NavLink>
                                </Col>
                            </div>
                           
                            <div className="content-col">
                                <p className="comments" > Comments</p>                              
                                <p className="profile-comments" >
                                    {comment}
                                </p>
                            </div>

                            <div className="content-col">
                                <p className="comments" > Rate</p> 
                                <p className="profile-comments" >
                                    {rate}
                                </p>   
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
