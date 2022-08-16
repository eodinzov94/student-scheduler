import React, {useEffect, useState} from 'react';
import "./auth.css"
import {useDispatch, useSelector} from "react-redux";
import {authActions, login} from '../../redux/reducers/auth-reducer';
import {AppStateType} from "../../redux/Store";
import {Button, Card, Form, Input, notification} from "antd";


const Login: React.FC = (props) => {
    const dispatch = useDispatch()
    const error = useSelector<AppStateType>(state => state.auth.error) as string
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const showError = () => {
        if(error) {
            notification.error({
                message: 'Authentication error',
                description: error,
                placement: 'topLeft',
                duration: 10,
            });
            dispatch(authActions.setAuthError(''))
        }
    }
    useEffect(showError,[error])
    function onFinish() {
        dispatch(login(email,password))
    }
    return (
                <Card className="card">
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Please input your email!'}]}
                        >
                            <Input onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)}
                                            value={password}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
    );
};

export default Login;