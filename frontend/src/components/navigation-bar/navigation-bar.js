import React from "react";
import './navigation-bar.css';
import { Menu } from 'antd';
import { HomeFilled, SettingFilled } from '@ant-design/icons';
import Profile from '../../images/profile.svg';
import Books from '../../images/books.svg';
import Scan from '../../images/scan-icon.svg';
import Signout from '../../images/logout-icon.png'
import { NavLink } from "react-router-dom";



export default class NavBarComp extends React.Component {

    render() {
        return (

            <Menu
                mode="inline"
                // defaultSelectedKeys={}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item selected className="menu-item" key="1" icon={<HomeFilled style={{ fontSize: "20px", paddingBottom: "6px", marginRight: "13px" }} />} ><NavLink
                    to="/main-page" exact>Home</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="2" icon={<img src={Books} alt="" style={{ width: "11%", paddingBottom: "6px", marginRight: "10px" }} />} ><NavLink
                    to="/main-page" exact> Books </NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="3" icon={<img src={Scan} alt="" style={{ width: "11%", paddingBottom: "6px", marginRight: "15px" }} />}><NavLink
                    to="/find-book" exact>Find Books</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="4" icon={<img src={Profile} alt="" style={{ width: "13%", paddingBottom: "6px", marginRight: "13px" }} />}><NavLink
                    to="/profile-page" exact>Profile</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="5" icon={<SettingFilled style={{ fontSize: "20px", paddingBottom: "6px", marginRight: "14px" }} />}><NavLink
                    to="/settings" exact>Settings</NavLink></Menu.Item>
                <Menu.Item selected className="menu-item" key="6" icon={<img src={Signout} alt="" style={{ width: "11%", paddingBottom: "6px", marginRight: "15px" }} />}><NavLink
                    to="/" exact>Sign out</NavLink></Menu.Item>
            </Menu>

        );

    }

}