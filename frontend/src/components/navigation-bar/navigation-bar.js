import React from "react";
import './navigation-bar.css';
import { Layout, Menu } from 'antd';
import { HomeFilled, SettingFilled } from '@ant-design/icons';
import Profile from '../../images/profile.svg';
import Books from '../../images/books.svg';
import Scan from '../../images/scan-icon.svg';
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

    render() {
        return (
            
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item selected  className="menu-item" key="1" icon={<HomeFilled style={{fontSize:"20px", paddingBottom: "6px", marginRight: "10px" }}/>} ><NavLink
                                to="/main-page" exact>Home</NavLink></Menu.Item>
                            <Menu.Item selected  className="menu-item" key="2" icon={<img src={Books} alt="" style={{ width: "11%", paddingBottom: "6px", marginRight: "10px" }} />} ><NavLink
                                to="/book-info" exact> Books </NavLink></Menu.Item>
                            <Menu.Item selected  className="menu-item" key="3" icon={<img src={Scan} alt="" style={{ width: "11%", paddingBottom: "6px", marginRight: "10px" }} />}><NavLink
                                to="/find-book.js" exact>Find Books</NavLink></Menu.Item>
                            <Menu.Item selected  className="menu-item" key="4" icon={<img src={Profile} alt="" style={{ width: "13%", paddingBottom: "6px", marginRight: "10px" }} />}><NavLink
                                to="/profile-page" exact>Profile</NavLink></Menu.Item>
                            <Menu.Item selected  className="menu-item" key="5" icon={<SettingFilled style={{fontSize:"20px", paddingBottom: "6px", marginRight: "10px" }}/> }><NavLink
                                to="/settings.js" exact>Settings</NavLink></Menu.Item>
                        </Menu>                    
        
        );
        
    }

}