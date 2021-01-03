import React, { Component } from "react";
import { Layout} from 'antd';
import "./profile.css";
import MainLogo from '../../../images/mainpage-logo.svg';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { Row, Col } from 'react-bootstrap';
import { Input } from 'antd';
import axios from 'axios';

import Aleyna from '../../../images/footer-images/aleyna.png';
import Burcu from '../../../images/footer-images/burcu.png';
import Onur from '../../../images/footer-images/onur.png';
import Kaan from '../../../images/footer-images/kaan.png';
import BabyYoda from '../../../images/baby-yoda.png';
import Khaleesi from '../../../images/khaleesi.png';



const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = value => console.log(value);

export default class ProfileContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            secondColumnStart:2
        };
    }

    componentDidMount() {
        const email = 'user34@user.com' //for testing
        axios.get(`http://localhost:8080/api/users/?email=` + email,
        {
        withCredentials: true
        })
            .then(res => {
                console.log(res.data);
                // const data = res.data.slice(0, 4);
                const data = [res.data]
                const user = data.map(u =>
                    <div key={u.email}>
                         {/* <img src={} alt="" /> */}
                        <p>{u.email}</p>
                       
                    </div>
                )
                this.setState({
                    user,
                    error: null
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }
    render() {
        const imgsrc = Khaleesi;
        const name = "Daenerys Targaryen";
        const username = "@khaleesi";
        const bio = "I love reading books and comment about them as I read. “When you play the game of thrones, you win or you die. There is no middle ground.” — George R. R. Martin";

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
                            paddingLeft:7,
                            paddingRight:7,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Row className="bio-row">
                                <img src={imgsrc} alt="" className="footer-image" style={{ height:"10%", width: "10%", paddinTop:"26px", paddingBottom: "0px", marginRight: "10px", marginTop: "10px" }}/>
                            <Col>
                                <p className="user-name" > {name}</p>
                                <p className="username" > {username}</p>

                                {/*<p style={{fontSize:"12px", paddingTop:"0px", margin:"0" }} > burcuaykan13@gmail.com</p>*/}
                                <p className="bio"> {bio} </p>

                            </Col>

                        </Row>
                        <Row>
                        <div class="container-grid">
                            
                            <div class="list-col">
                                <Col class="list-col">
                                    
                                    <p className="lists" > Lists</p>
                                    <Col className="mini-list-col">
                                    <p className="mini-lists" > Finished</p>
                                    <p className="book-names" > - The Zen of CSS Design: Visual Enlightenment for the Web </p>
                                    <p className="book-names" > - Ready Player Two</p>
                                    <p className="book-names" > - The Illustrated Alchemist: A Fable about Following Your Dream</p>
                                    <p className="book-names" > - We Were Not Like Other People</p>
                                    </Col>
                                    <Col className="mini-list-col">
                                    <p className="mini-lists" > To be read</p>
                                    <p className="book-names" > - Cryptonomicon</p>
                                    <p className="book-names" > - The Game: Penetrating the Secret Society of Pickup Artists</p>
                                    <p className="book-names" > - Zen and the Art of Motorcycle Maintenance: An Inquiry Into Values (Phaedrus  #1)</p>
                                    <p className="book-names" > - Quicksilver (The Baroque Cycle  #1)</p>
                                    <p className="book-names" > ...</p>
                                    </Col>

                                    <Col className="mini-list-col">
                                    <p className="mini-lists" > Wishlist</p>
                                    <p className="book-names" > - The Zebra Wall</p>
                                    <p className="book-names" > - The Confusion (The Baroque Cycle  #2)</p>
                                    <p className="book-names" > - The Known World</p>
                                    <p className="book-names" > - How to Buy  Sell & Profit on eBay: Kick-Start Your Home-Based Business in Just Thirty Days</p>
                                    <p className="book-names" > ...</p>
                                    </Col>


                                </Col>
                            </div>
                           
                            <div class="content-col">
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
                                <Row className="comment-row">
                                    <Col>
                                        <p className="comment-book-name" >We Were Not Like Other People</p>
                                        <p className="profile-comment-rating" >Rating: 4.3</p>                                    
                                        <p className="profile-comments" >
                                            I thought this is a kid's book, but I was wrong. This little book (215 pp.) is a whirlwind slice of life. You never know what you will find out about in this life.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="comment-row">
                                    <Col>
                                        <p className="comment-book-name" >The Illustrated Alchemist: A Fable about Following Your Dream</p>
                                        <p className="profile-comment-rating" >Rating: 4.8</p>                                    
                                        <p className="profile-comments" >
                                            Whenever I felt lost, depressed, sad, numb, conflicted, frustrated, exhausted, I get this book into my hands and follow the journey of young shepherd Santiago who is looking for a worldly treasure. As like T.S. Eliot says: “ The journey not the arrival matters.”                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            
                        </div>
                        </Row>
                        {/*Profile page for the user with email: {this.state.user}*/}                                   
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        );
    }
}
