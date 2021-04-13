import React, { Component } from "react";
import "./main-page.css";
import { Layout } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
//import Mockingbird from '../../../images/bookcovers-dummy/to kill a mockingbird.svg';
// import Gatsby from '../../../images/bookcovers-dummy/the great gatsby.svg';
// import TwoCities from '../../../images/bookcovers-dummy/a tale of two cities.svg';
// import Misarables from '../../../images/bookcovers-dummy/les misarables.svg';
// import Cristo from '../../../images/bookcovers-dummy/monte cristo.svg';
import { Input } from 'antd';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Books from "./books/books";

const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = value => console.log(value);

export default class MainPage extends Component {

    render() {
        return (
            <Layout style={{ height: "auto" }}>
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

                                    <div className="col">
                                        <Books />
                                    </div>

                                </Row>
                            </Col>

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
