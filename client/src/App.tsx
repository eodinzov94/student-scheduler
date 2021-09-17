import React, {useEffect} from 'react';
import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "./redux/Store"
import {Layout, Spin} from "antd";
import {Content, Footer} from 'antd/lib/layout/layout';
import Navbar from "./components/Navbar/Navbar";
import DataTable from "./components/Courses/Courses";
import {initializeApp} from "./redux/reducers/app-reducer";
import MiniCalendar from "./components/Calendar/Calendar";


const App: React.FC = () => {
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth) as boolean
    const dispatch = useDispatch()
    const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    return (
        <BrowserRouter>
            <Layout>
                <Spin spinning={isLoading}>
                    <Navbar/>
                    <Content>
                        <Switch>
                            {isAuth ?
                                <>
                                    <Route path='/' exact={true}
                                           render={() => <Redirect to={'/courses'}/>}/>
                                    <Route path='/courses' exact={true}
                                           render={() => <DataTable/>}/>
                                    <Route path='/calendar' exact={true}
                                           render={() => <MiniCalendar/>}/>
                                    <Route path='/register' exact={true}
                                           render={() =>  <Redirect to={'/courses'}/>}/>
                                    <Route path='/login' exact={true}
                                           render={() =>  <Redirect to={'/courses'}/>}/>
                                </>
                                :
                                <>
                                    <Route path='/courses' exact={true}
                                           render={() => <Redirect to={'/login'}/>}/>
                                   {/* <Route path='/calendar' exact={true}
                                           render={() => <Redirect to={'/login'}/>}/>*/}
                                    <Route path='/' exact={true}
                                           render={() => <Redirect to={'/login'}/>}/>
                                    <Route path='/register' exact={true}
                                           render={() => <Register/>}/>
                                    <Route path='/login' exact={true}
                                           render={() => <Login/>}/>
                                </>
                            }
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: "center", backgroundColor: "gray"}}><strong>Made by Evgeny
                        Odinzov</strong></Footer>
                </Spin>
            </Layout>
        </BrowserRouter>

    );
}

export default App;
