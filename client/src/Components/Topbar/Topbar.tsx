import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import { IUser } from '../../types/types';
import "./topbar.css"
import {connect} from "react-redux";
import {actions, getAuthUserData} from '../../bll/reducers/auth-reducer';
import { AppStateType } from '../../bll/Store';



interface ITopbarProps{
    user?: IUser | null
    isAuth:boolean
    logout():void
    getAuthUserData():any
}
const Topbar:React.FC<ITopbarProps> = (props) => {
    useEffect(()=>{if(localStorage.getItem('accessToken')){props.getAuthUserData()}},[])
    return (
        <div className="topbar">
            {props.isAuth ? <div className="navbar"><span>{props.user?.email}</span><button onClick={props.logout}>Logout</button></div>:
                <div className="navbar">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            }


        </div>
    );
}
const mapStateToProps = (state: AppStateType) => {
    return ({
        user: state.auth.user,
        isAuth: state.auth.isAuth,
    })
}
export default connect(mapStateToProps,{logout:actions.logout,getAuthUserData})(Topbar);