import React from "react";
import './navigation-bar.css';
import { Layout, Menu } from 'antd';
import { HomeFilled, SettingFilled } from '@ant-design/icons';
import Profile from '../../images/profile.svg';
import Books from '../../images/books.svg';
import { Redirect, NavLink } from "react-router-dom";
import BookInfoContent from "../pages/book-info/book-info";
import MainLogo from '../../images/mainpage-logo.svg';
import { Input } from 'antd';
import MainPage from '../pages/main-page/main-page';
import FindBookContent from '../pages/find-book-page/find-book.js';
import ProfileContent from '../pages/profile-page/profile.js';
import SettingsContent from '../pages/settings-page/settings.js';




const { Header, Content, Sider } = Layout;
const { Search } = Input;
const onSearch = value => console.log(value);


export default class NavBarComp extends React.Component {

    constructor(props){
        super(props);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleSecond = this.handleSecond.bind(this);
        this.handleThird = this.handleThird.bind(this);
        this.handleFourth = this.handleFourth.bind(this);
        this.handleFifth = this.handleFifth.bind(this);

        this.state = {item: 1};
    }

    handleFirst() {
        this.setState({item:1});

    }
    handleSecond() {
        this.setState({item:2});
    }
    handleThird() {
        this.setState({item:3});
    }
    handleFourth() {
        this.setState({item:4});
    }
    handleFifth() {
        this.setState({item:5});
    }
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
                    <Layout style={{ }}></Layout>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item selected onClick={this.handleFirst} className="Home" key="1" icon={<HomeFilled />} >Home</Menu.Item>
                            <Menu.Item selected onClick={this.handleSecond} className="Books" key="2" icon={<img src={Books} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />} > Books </Menu.Item>
                            <Menu.Item selected onClick={this.handleThird} className="FindBooks" key="3" icon={<img src={Books} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Find Books</Menu.Item>
                            <Menu.Item selected onClick={this.handleFourth} className="Profile" key="4" icon={<img src={Profile} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Profile</Menu.Item>
                            <Menu.Item selected onClick={this.handleFifth} className="Settings" key="5" icon={<SettingFilled />}>Settings</Menu.Item>
                        </Menu>                    
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}></Layout>
                    <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >

                            {this.state.item == 1 &&
                                <MainPage/>
                            }
                            {this.state.item == 2 &&
                                <BookInfoContent/>
                            }
                            {this.state.item == 3 &&
                                <FindBookContent/>
                            }
                            {this.state.item == 4 &&
                                <ProfileContent/>
                            }
                            {this.state.item == 5 &&
                                <SettingsContent/>
                            }
                            
                        </Content>
                </Layout>
                
            </Layout>
        );
        
    }

}