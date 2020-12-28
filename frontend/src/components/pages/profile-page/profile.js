import React, { Component } from "react";
import { Layout} from 'antd';
import "./profile.css";
import MainLogo from '../../../images/mainpage-logo.svg';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import { Row, Col } from 'react-bootstrap';
import { Input } from 'antd';
const { Search } = Input;
const { Header, Content, Sider } = Layout;


const onSearch = value => console.log(value);

export default class ProfileContent extends Component {
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
                        <Col>
                            <Row>
                                <div >
                                    Profile page
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
