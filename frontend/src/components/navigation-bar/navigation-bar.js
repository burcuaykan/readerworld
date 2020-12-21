import React from "react";
import './navigation-bar.css';
import { Menu } from 'antd';
import { HomeFilled, SettingFilled } from '@ant-design/icons';
import Profile from '../../images/profile.svg';
import Books from '../../images/books.svg';
import { Redirect, NavLink } from "react-router-dom";

export default class Footercomp extends React.Component {

    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item selected className="MenuItem" key="1" icon={<HomeFilled />} >Home</Menu.Item>
                <Menu.Item selected className="MenuItem" key="2" icon={<img src={Books} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />} > Books </Menu.Item>
                <Menu.Item selected className="MenuItem" key="3" icon={<img src={Books} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Find Books</Menu.Item>
                <Menu.Item selected className="MenuItem" key="4" icon={<img src={Profile} alt="" style={{ width: "9%", paddingBottom: "6px", marginRight: "10px" }} />}>Profile</Menu.Item>
                <Menu.Item selected className="MenuItem" key="5" icon={<SettingFilled />}>Settings</Menu.Item>
            </Menu>
        )
    }

}