import React, {useEffect} from 'react';
import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "./redux/Store"
import {Layout, Spin} from "antd";
import {Content, Footer} from 'antd/lib/layout/layout';
import Navbar from "./components/Navbar/Navbar";
import DataTable from "./components/Table/Table";
import {initializeApp} from "./redux/reducers/app-reducer";


const App: React.FC = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
    useEffect(()=>{
        dispatch(initializeApp())},[])
    return (
        <BrowserRouter>
            <Layout>
                <Spin spinning={isLoading}>
                    <Navbar/>
                    <Content>
                        <Switch>
                            <Route path='/' exact={true}
                                   render={() => <div>Welcome</div>}/>
                            <Route path='/register' exact={true}
                                   render={() => <Register/>}/>
                            <Route path='/login' exact={true}
                                   render={() => <Login/>}/>
                            <Route path='/courses' exact={true}
                                   render={() => <DataTable/>}/>
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Spin>
            </Layout>
        </BrowserRouter>

    );
}

export default App;
