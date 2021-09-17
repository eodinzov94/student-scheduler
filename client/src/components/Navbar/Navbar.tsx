import React from 'react';
import {Link} from 'react-router-dom'
import {IUser} from '../../types/types';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from '../../redux/Store';
import {Layout, Menu} from "antd";
import {LoginOutlined, UserOutlined} from "@ant-design/icons";
import SubMenu from 'antd/lib/menu/SubMenu';
import {logout} from "../../redux/reducers/auth-reducer";
import Title from 'antd/lib/typography/Title';

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    const user = useSelector<AppStateType>(state => state.auth.user ) as IUser
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth ) as boolean
    const onLogout = () => {
        dispatch(logout())
    }
    return (
        <Layout.Header className={"header"}>
            {isAuth ?
                <Menu theme="dark" mode="horizontal">
                    <SubMenu key="sub-menu-user" icon={<UserOutlined/>} title={user?.email}>
                        <Menu.Item key="logout" onClick={onLogout} icon={<LoginOutlined/>}>Logout</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="courses"> <Link to="/courses">My Courses</Link></Menu.Item>
                </Menu>

                :
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="register"> <Link to="/register">Register</Link></Menu.Item>
                    <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
                </Menu>
            }
        </Layout.Header>
    );
}

export default Navbar;