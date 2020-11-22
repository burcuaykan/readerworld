import React, {Component} from "react";
import "./sign-in.css";
import { Form, Input, Button } from 'antd';
import SignBackground from '../../../../images/sign-background.svg';
import { Tabs } from 'antd';
import WelcomeLogo from '../../../../images/welcome-icon.svg';


const { TabPane } = Tabs;

export default class SignIn extends Component {

    // onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    render() {
       
        return (
        <div>
            <div  id="welcome-header-menu" style={{float: "left"}} >
            {/* <Menu className="welcome-header-menu" mode="horizontal">
                <Menu.Item id="welcome-logo" style={{ float: "left" }}>
                    <img src={WelcomeLogo} alt="" style={{width: "55%"}}/>
                </Menu.Item>
            </Menu> */}
            <img src={WelcomeLogo} alt="" style={{width: "55%"}}/>
        </div>
            <div className="container" style={{ paddingTop: "150px" }} >
                <div id="sign-in" >
                    <img src={SignBackground} alt="" className="sign-background" style={{ width: "47%" }} />
                    <div className="sign-center">
                        <h1 className="sign-header">WELCOME</h1>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Sign in" key="1" className="sign-in-center">
                                <Form
                                    // onSubmit={this.onSubmit}
                                    layout="vertical"
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={this.onSubmit}
                                    onFinishFailed={this.onFinishFailed}
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

                                        <Input 
                                            ></Input>  
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
                                        <Input.Password 
                                           ></Input.Password> 
                                    </Form.Item>

                                    <Form.Item layout="center">
                                        <Button type="primary" htmlType="submit">
                                            Sign in </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="Sign Up" key="2">
                                <Form
                                    layout="vertical"
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}
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
                                    <Form.Item
                                        label="Password again"
                                        name="password-again"
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
                                            Sign up</Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                        <hr />
                        {/* <h2 className="h2-text">OR</h2> */}
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

