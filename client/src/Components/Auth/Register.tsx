import React from 'react';

const Register:React.FC = () => {
    return (
        <form>
            <div className="register">
                <input type="email" placeholder="email"/>
                <input type="username" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <input type="password" placeholder="password confirm"/>
                <button>Register</button>
            </div>
        </form>
    );
};

export default Register;