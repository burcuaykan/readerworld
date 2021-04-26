import React, { Component } from "react";
import { Layout, Card } from 'antd';
import MainLogo from '../../../images/mainpage-logo.svg';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import NavBarComp from '../../navigation-bar/navigation-bar.js'
import './add-book.css';
import BookImage from '../../../images/book.svg';
const { Search } = Input;
const onSearch = value => console.log(value);

const { Header, Content, Sider } = Layout;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};
export default class AddBook extends Component {
    render() {
        return (
            <Layout style={{ height: "auto" }}>
                <Header className="header">
                    <div className="logo" style={{ float: "left" }}>
                        <img src={MainLogo} alt="" style={{ width: "40%" }} />
                    </div>
                    
                </Header>
                <Layout>
                    <Sider className="site-layout-background d-none d-md-block" width={200} >
                        <NavBarComp />
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Content>
                            <Card title="Add Book to Reader World!" style={{ width: 'auto', textAlign: 'center' }}>
                                <Row>
                                    <Col span={16}>
                                        <Form {...layout} name="nest-messages" className="add-book" >
                                            <Form.Item label="Author" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Book Name" rules={[{ type: 'email' }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="ISBN" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Page Number">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Image Link">
                                                <Input.TextArea />
                                            </Form.Item>
                                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                                <Button type="primary" htmlType="submit">
                                                    Add Book
                                    </Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col span={8}>
                                        <img src={BookImage} alt="" className="book-image"/>
                                    </Col>
                                </Row>
                            </Card>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
