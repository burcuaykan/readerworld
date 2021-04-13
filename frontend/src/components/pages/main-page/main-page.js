import React, { Component } from "react";
import "./main-page.css";
import { Button, Layout } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { MenuOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';

import Books from "./books/books";

const { Header, Content, Sider } = Layout;


export default class MainPage extends Component {
    state = {
        isSmallMenuHidden: true
    }

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
    render() {
        return (
            <Layout style={{ height: "auto" }}>
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
