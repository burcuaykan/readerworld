import React from "react";
import "./main-page.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeFilled, ShopFilled, SettingFilled } from '@ant-design/icons';
import MainLogo from '../../../../images/mainpage-logo.svg';
import Books from '../../../../images/books.svg';
import Bookclubs from '../../../../images/bookclub.svg';
import Leaderboard from '../../../../images/leaderboard.svg';
import Profile from '../../../../images/profile.svg';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  
const onSearch = value => console.log(value);

const MainPage = () => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" style={{float: "left"}}>
                <img src={MainLogo} style={{width: "30%"}}/>
                </div>
                <div className="search-bar">
                <Search className="search-bar-input" placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                </div> 
                {
                //<div>
                //<Menu mode="horizontal" defaultSelectedKeys={['2']}>
                //    <Menu.Item key="1">nav 1</Menu.Item>
                //    <Menu.Item key="2">nav 2</Menu.Item>
                //    <Menu.Item key="3">nav 3</Menu.Item>
                //</Menu>
                //</div>
                }
            </Header>
            <Layout>
            <Sider className="site-layout-background" width={200} >
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item selected className="MenuItem" key="1" icon={<HomeFilled />} >Home</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="2" icon={<img src={Books} style={{width: "9%", paddingBottom: "6px"}}/>}>Books</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="3" icon={<img src={Bookclubs} style={{width: "9%", paddingBottom: "6px"}}/>}>Book Clubs</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="4" icon={<ShopFilled />} >Store</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="5" icon={<img src={Leaderboard} style={{width: "9%", paddingBottom: "6px"}}/>}>Leaderboard</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="6" icon={<img src={Profile} style={{width: "9%", paddingBottom: "6px"}}/>}>Profile</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="7" icon={<SettingFilled />}>Settings</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                {//<Breadcrumb style={{ margin: '16px 0' }}>
                //<Breadcrumb.Item>Home</Breadcrumb.Item>
                //<Breadcrumb.Item>List</Breadcrumb.Item>
                //<Breadcrumb.Item>App</Breadcrumb.Item>
                //</Breadcrumb>
            }
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                Content
                </Content>
            </Layout>
            </Layout>
        </Layout>
    );
}

export default MainPage;