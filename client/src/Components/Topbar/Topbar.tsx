import React from 'react';
import {Link} from 'react-router-dom'
import { IUser } from '../../Types/Types';
import "./topbar.css"



interface ITopbarProps{
    user?: IUser | null
}
const Topbar:React.FC<ITopbarProps> = (props) => {
    return (
        <div className="topbar">
            {props.user ? <div className="navbar"><span>{props.user.username}</span><button>Logout</button></div>:
                <div className="navbar">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            }


        </div>
    );
}

export default Topbar;