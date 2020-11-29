import React, {Component} from "react";
import "./sign-in.css";
import { Form, Input, Button } from 'antd';
import SignBackground from '../../../../images/sign-background.svg';
import { Tabs } from 'antd';
import WelcomeLogo from '../../../../images/welcome-icon.svg';
import axios from 'axios';

const { TabPane } = Tabs;

export default class SignIn extends Component {

    constructor(props) {
        super(props)

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
    }
    onChangeUserName = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangeUserPassword =(e) => {
        this.setState( { password: e.target.value });
    }

    onSubmit = (e) => {
        const userObject = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('https://jsonplaceholder.typicode.com/users', userObject)
            .then((res) => {
                this.setState({ loggedIn: true});
                console.log(res.data);
                
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ username: '', password: '' })
    }
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
                                             value={this.state.username} onChange={this.onChangeUserName}></Input>  
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
                                           value={this.state.password} onChange={this.onChangeUserPassword}></Input.Password> 
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
                                        <Input value={this.state.username} onChange={this.onChangeUserName}></Input> 
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
                                        <Input.Password value={this.state.password} onChange={this.onChangeUserPassword}></Input.Password> 
                                    </Form.Item>
                                    <Form.Item
                                        name="confirm"
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
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
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

