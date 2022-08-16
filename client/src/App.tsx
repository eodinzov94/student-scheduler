import React, {useEffect} from 'react';
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "./redux/Store"
import {Card, Layout, Row, Spin, Typography} from "antd";
import {initializeApp} from "./redux/reducers/app-reducer";
import {AppRouter} from './router/AppRouter';
import Navbar from './components/Navbar/Navbar';


const App: React.FC = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    return (
        <BrowserRouter>
                <Spin spinning={isLoading}>
                    <Navbar/>
                    {isLoading ?
                        <Row justify="center" align="middle">
                            <Card >
                                <Typography.Title style={{textAlign: "center"}}>App is Loading ...</Typography.Title>
                            </Card>
                        </Row>
                        :
                        <>
                            <div className="content" >
                                <AppRouter/>
                            </div>
                        </>
                    }
                </Spin>
            <Layout.Footer className="footer">
                <strong>
                    Made by Evgeny Odinzov
                </strong>
            </Layout.Footer>
        </BrowserRouter>

    );
}

export default App;
