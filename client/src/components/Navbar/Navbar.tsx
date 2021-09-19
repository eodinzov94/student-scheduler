import React from 'react';
import {Link} from 'react-router-dom'
import {IUser} from '../../types/types';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from '../../redux/Store';
import {Layout, Menu} from "antd";
import {CalendarOutlined, LoginOutlined, LogoutOutlined, ScheduleOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import SubMenu from 'antd/lib/menu/SubMenu';
import {logout} from "../../redux/reducers/auth-reducer";

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    const user = useSelector<AppStateType>(state => state.auth.user ) as IUser
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth ) as boolean
    const onLogout = () => {
        dispatch(logout())
    }
    return (
        <Layout.Header className={"header minWidth"}>
            {isAuth ?
                <Menu theme="dark" mode="horizontal">
                    <SubMenu key="sub-menu-user" icon={<UserOutlined/>} title={user?.email}>
                        <Menu.Item key="logout" onClick={onLogout} icon={<LogoutOutlined />}> Logout</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="courses"> <Link to="/courses"><ScheduleOutlined /> My Courses</Link></Menu.Item>
                    <Menu.Item key="calendar"> <Link to="/calendar"><CalendarOutlined /> Calendar</Link></Menu.Item>
                </Menu>

                :
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="register"> <Link to="/register"><UserAddOutlined /> Register</Link></Menu.Item>
                    <Menu.Item key="login"><Link to="/login"><LoginOutlined /> Login</Link></Menu.Item>
                </Menu>
            }
        </Layout.Header>
    );
}

export default Navbar;