import React, {useState} from 'react';
import "./auth.css"
import {connect} from "react-redux";
import { login } from '../../bll/reducers/auth-reducer';
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../bll/Store";
interface ILoginProps {
    login(login:string,password:string):any
    isAuth:boolean
}
const Login: React.FC<ILoginProps> = (props) => {
    function OnClickHandler (){
        props.login(email,password)
    }
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    if(props.isAuth){
        return <Redirect to="/"/>
    }
    return (
            <div className="login">
                <input type="email" onChange={(e)=>setEmail(e.target.value)}
                value={email} placeholder="Email"/>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}
                value={password} placeholder="Password"/>
                <button onClick={OnClickHandler}>Login</button>
            </div>
    );
};
const mapStateToProps = (state: AppStateType) => {
    return ({
        isAuth: state.auth.isAuth,
    })
}
export default connect( mapStateToProps,{login})(Login);