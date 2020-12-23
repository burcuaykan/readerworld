import React, { Component } from "react";
import { Layout} from 'antd';

const { Header, Content, Sider } = Layout;

export default class ProfileContent extends Component {
    render() {
        return (
            <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                        <h1>Profile</h1>
            </Content>
        );
    }
}
