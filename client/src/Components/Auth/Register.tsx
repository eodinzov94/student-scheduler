import React, {useState} from 'react';
import {connect} from "react-redux";
import { register } from '../../bll/reducers/auth-reducer';
import {AppStateType} from "../../bll/Store";
import {Redirect} from "react-router-dom";

interface IRegisterProps {
    register(login:string,password:string,password2:string):any
    isAuth:boolean
}

const Register:React.FC<IRegisterProps> = (props) => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [password2,setPassword2]= useState('')
    if(props.isAuth){
        return <Redirect to="/"/>
    }
    const registerHandler = ()=>{
        props.register(email,password,password2)
    }
    return (
            <div className="register">
                <input type="email" placeholder="email" value={email}
                       onChange={(e)=>setEmail(e.target.value) }/>
                <input type="password" placeholder="password" value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" placeholder="password confirm" value={password2}
                onChange={(e)=>setPassword2(e.target.value)}/>
                <button onClick={()=>registerHandler()}>Register</button>
            </div>
    );
};
const mapStateToProps = (state: AppStateType) => {
    return ({
        isAuth: state.auth.isAuth,
    })
}
export default connect(mapStateToProps,{register})(Register);