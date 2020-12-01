import React from "react";
import "./main-page.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeFilled, ShopFilled, SettingFilled } from '@ant-design/icons';
import MainLogo from '../../../images/mainpage-logo.svg';
import Books from '../../../images/books.svg';
import Bookclubs from '../../../images/bookclub.svg';
import Leaderboard from '../../../images/leaderboard.svg';
import Profile from '../../../images/profile.svg';
import Mockingbird from '../../../images/bookcovers-dummy/to kill a mockingbird.svg';
import Gatsby from '../../../images/bookcovers-dummy/the great gatsby.svg';
import TwoCities from '../../../images/bookcovers-dummy/a tale of two cities.svg';
import Misarables from '../../../images/bookcovers-dummy/les misarables.svg';
import Cristo from '../../../images/bookcovers-dummy/monte cristo.svg';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

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
        <Layout style={{height:"625px"}}>
            <Header className="header">
                <div className="logo" style={{float: "left"}}>
                <img src={MainLogo} style={{width: "40%"}}/>
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
                    <Menu.Item selected className="MenuItem" key="2" icon={<img src={Books} style={{width: "9%", paddingBottom: "6px", marginRight: "10px"}}/>}>Books</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="3" icon={<img src={Bookclubs} style={{width: "9%", paddingBottom: "6px", marginRight: "10px"}}/>}>Book Clubs</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="4" icon={<ShopFilled />} >Store</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="5" icon={<img src={Leaderboard} style={{width: "9%", paddingBottom: "6px", marginRight: "10px"}}/>}>Leaderboard</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="6" icon={<img src={Profile} style={{width: "9%", paddingBottom: "6px", marginRight: "10px"}}/>}>Profile</Menu.Item>
                    <Menu.Item selected className="MenuItem" key="7" icon={<SettingFilled />}>Settings</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px 24px 24px' }}>
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
                <div className="logo" style={{float: "left"}}>
                    <Col>
                        <Row>
                            <Col><img src={Mockingbird} style={{width: "60%"}}/></Col>
                            <Col> <img src={Gatsby} style={{width: "60%"}}/> </Col>
                            <Col> <img src={TwoCities} style={{width: "60%"}}/> </Col>
                            <Col> <img src={Misarables} style={{width: "60%"}}/> </Col>
                            <Col> <img src={Cristo} style={{width: "60%"}}/> </Col>
                        </Row>
                        <Row>
                            <Col style={{color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500"}}>To Kill a Mockingbird</Col>
                            <Col style={{color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500"}}>The Great Gatsby</Col>
                            <Col style={{color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500"}}>A Tale of Two Cities</Col>
                            <Col style={{color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500"}}>Les Misarables</Col>
                            <Col style={{color: "#FFFF", margin: "15px 0px 0px 0px", fontWeight: "500"}}>The Count of Monte Cristo</Col>
                        </Row>
                        <Row>
                            <Col style={{color: "#FFFF", fontWeight: "200"}}>Harper Lee</Col>
                            <Col style={{color: "#FFFF", fontWeight: "200"}}>F. Scott Fitzgerald</Col>
                            <Col style={{color: "#FFFF", fontWeight: "200"}}>Charles Dickens</Col>
                            <Col style={{color: "#FFFF", fontWeight: "200"}}>Victor Hugo</Col>
                            <Col style={{color: "#FFFF", fontWeight: "200"}}>Alexandre Dumas</Col>
                        </Row>
                    </Col>

                </div>
                
                </Content>
            </Layout>
            </Layout>
        </Layout>
    );
}

export default MainPage;