import React from "react";
import './navigation-bar.css';
import { Menu } from 'antd';
import Profile from '../../images/profile.svg';
import Books from '../../images/books.svg';
import Scan from '../../images/scan-icon.svg';
import Signout from '../../images/logout-icon.png'
import Home from '../../images/home-icon-new.svg'
import Settings from '../../images/settings-icon-new.svg'
import Upload from '../../images/upload-icon-new.svg'

import { NavLink } from "react-router-dom";



export default class NavBarComp extends React.Component {

    render() {
        return (

            <Menu
                mode="inline"
                // defaultSelectedKeys={}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item selected className="menu-item" key="1" icon={<img src={Home} className="menu-icon" alt=""/>} ><NavLink
                    to="/main-page" exact>Home</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="2" icon={<img src={Scan}  className="menu-icon" alt="" />}><NavLink
                    to="/find-book" exact>Find Books</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="3" icon={<img src={Upload}  className="menu-icon" alt=""  />}><NavLink
                    to="/upload-image" exact>Upload Image</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="4" icon={<img src={Profile} className="menu-icon" alt="" />}><NavLink
                    to="/profile-page" exact>Profile</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="5" icon={<img src={Settings} className="menu-icon" alt=""/>}><NavLink
                    to="/settings" exact>Settings</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="6" icon={<img src={Signout} className="menu-icon" alt=""  />}><NavLink
                    to="/" exact>Sign out</NavLink></Menu.Item>
            </Menu>

        );

    }

}

// <Menu.Item selected className="menu-item" key="2" icon={<img src={Books} className="menu-icon" alt=""/>} ><NavLink to="/main-page" exact> Books </NavLink></Menu.Item>