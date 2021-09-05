import React from 'react';
import "./auth.css"

const Login: React.FC = () => {
    return (

        <form>
            <div className="login">
                <input type="username"/>
                <input type="password"/>
                <button>Login</button>
            </div>
        </form>

    );
};

export default Login;