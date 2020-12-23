import React, { Component } from "react";
import { Layout} from 'antd';

const { Header, Content, Sider } = Layout;

export default class FindBookContent extends Component {
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
                        <h1>Find Book</h1>
            </Content>
        );
    }
}
