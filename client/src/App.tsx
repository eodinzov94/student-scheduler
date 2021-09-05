import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Topbar from "./Components/Topbar/Topbar";
import {Provider} from 'react-redux';
import store from "./bll/Store"

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <Topbar/>
                    <div>
                        <Switch>
                            <Route path='/' exact={true}
                                   render={() => <div>Welcome</div>}/>
                            <Route path='/register' exact={true}
                                   render={() => <Register/>}/>
                            <Route path='/login' exact={true}
                                   render={() => <Login/>}/>
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </div>
            </Provider>
        </BrowserRouter>

    );
}

export default App;
