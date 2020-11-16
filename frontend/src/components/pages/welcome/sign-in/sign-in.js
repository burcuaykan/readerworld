import React from "react";
import "./sign-in.css";
import { Form, Input, Button} from 'antd';
import SignBackground from '../../../../images/sign-background.svg';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const SıgnIn = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container" style={{paddingTop: "150px"}} >
            <div id="sign-in" >
                <img src={SignBackground} alt="" className="sign-background" style={{ width: "47%" }} />
                <div className="sign-center">
                    <h1 className="sign-header">WELCOME</h1>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Sign in" key="1" className="sign-in-center">
                            <Form
                                layout="vertical"
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username" 
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item layout="center">
                                    <Button type="primary" htmlType="submit">
                                        Sign in </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Sign Up" key="2">
                        </TabPane>
                    </Tabs>
                    <hr/>
                </div>
            </div>
        </div>
    );
}

export default SıgnIn;