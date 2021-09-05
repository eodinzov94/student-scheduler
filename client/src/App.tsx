import React from 'react';
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom'
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Topbar from "./Components/Topbar/Topbar";
import {IUser} from "./Types/Types";
const user:IUser = {
    email:"someemail",
    username:"jeko",
    isAdmin:false,
    profilePic:""
}
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Topbar user={user}/>
                <div>
                    <Switch>
                        <Route path='/register'
                               render={() => <Register/>}/>
                        <Route path='/login'
                               render={() => <Login/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
