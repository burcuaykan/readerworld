import React, { Component } from "react";
import "./main-page.css";
import { Layout, Menu } from 'antd';
import { HomeFilled, ShopFilled, SettingFilled } from '@ant-design/icons';
import MainLogo from '../../../images/mainpage-logo.svg';
import Books from '../../../images/books.svg';
import Bookclubs from '../../../images/bookclub.svg';
import Leaderboard from '../../../images/leaderboard.svg';
import Profile from '../../../images/profile.svg';
//import Mockingbird from '../../../images/bookcovers-dummy/to kill a mockingbird.svg';
// import Gatsby from '../../../images/bookcovers-dummy/the great gatsby.svg';
// import TwoCities from '../../../images/bookcovers-dummy/a tale of two cities.svg';
// import Misarables from '../../../images/bookcovers-dummy/les misarables.svg';
// import Cristo from '../../../images/bookcovers-dummy/monte cristo.svg';
import { Input } from 'antd';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'

const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = value => console.log(value);

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            secondColumnStart:2
        };
    }

    componentDidMount() {
        axios.get(`lhttp://localhost:8080/api/books/?isbn=9780060192501`)
            .then(res => {
                // const data = res.data.slice(0, 4);
                const data = res.data
                const books = data.map(u =>
                    <div key={u.id}>
                         {/* <img src={u.thumbnailUrl} alt="" /> */}
                        <p>{u.author}</p>
                        <p>{u.bookname}</p>
                       
                    </div>
                )
                this.setState({
                    books,
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
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item selected className="MenuItem" key="1" icon={<HomeFilled />} >Home</Menu.Item>
                            <Menu.Item selected className="MenuItem" key="2" icon={<img src={Books} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Books</Menu.Item>
                            <Menu.Item selected className="MenuItem" key="3" icon={<img src={Bookclubs} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Book Clubs</Menu.Item>
                            <Menu.Item selected className="MenuItem" key="4" icon={<ShopFilled />} >Store</Menu.Item>
                            <Menu.Item selected className="MenuItem" key="5" icon={<img src={Leaderboard} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Leaderboard</Menu.Item>
                            <Menu.Item selected className="MenuItem" key="6" icon={<img src={Profile} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Profile</Menu.Item>
                            <Menu.Item selected className="MenuItem" key="7" icon={<SettingFilled />}>Settings</Menu.Item>
                        </Menu>
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
                            <Col>
                                <Row>
                                    {/* <Col><img src={Mockingbird} alt="" style={{ width: "60%" }} /></Col>
                                        <Col> <img src={Gatsby} alt="" style={{ width: "60%" }} /> </Col>
                                        <Col> <img src={TwoCities} alt="" style={{ width: "60%" }} /> </Col>
                                        <Col> <img src={Misarables} alt="" style={{ width: "60%" }} /> </Col>
                                        <Col> <img src={Cristo} alt="" style={{ width: "60%" }} /> </Col> */}
                                    {/* <Col> {this.state.books}</Col>
                                    <Col>{this.state.books} </Col> */}
                                    <div className="col-md-6">
                                        {this.state.books.slice(0, this.state.secondColumnStart)}
                                    </div>
                                    <div className="col-md-6">
                                        {this.state.books.slice(this.state.secondColumnStart)}
                                    </div>


                                </Row>
                                {/* <Row>
                                        <Col style={{ color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500" }}>To Kill a Mockingbird</Col>
                                        <Col style={{ color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500" }}>The Great Gatsby</Col>
                                        <Col style={{ color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500" }}>A Tale of Two Cities</Col>
                                        <Col style={{ color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500" }}>Les Misarables</Col>
                                        <Col style={{ color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500" }}>The Count of Monte Cristo</Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ color: "#FFFF", fontWeight: "200" }}>Harper Lee</Col>
                                        <Col style={{ color: "#FFFF", fontWeight: "200" }}>F. Scott Fitzgerald</Col>
                                        <Col style={{ color: "#FFFF", fontWeight: "200" }}>Charles Dickens</Col>
                                        <Col style={{ color: "#FFFF", fontWeight: "200" }}>Victor Hugo</Col>
                                        <Col style={{ color: "#FFFF", fontWeight: "200" }}>Alexandre Dumas</Col>
                                    </Row> */}
                            </Col>



                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
