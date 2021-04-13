import React, { Component } from "react";
import { Layout } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import { Input } from 'antd';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
const { Search } = Input;
const onSearch = value => console.log(value);

const { Header, Content, Sider } = Layout;

export default class Settings extends Component {
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
                        <h1> Settings</h1>                                
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        );
    }
}
