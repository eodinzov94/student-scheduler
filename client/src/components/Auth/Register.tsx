import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authActions, register} from '../../redux/reducers/auth-reducer';
import {AppStateType} from "../../redux/Store";
import {Redirect} from "react-router-dom";
import {Button, Card, Form, Input, Layout, notification, Row} from "antd";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const Register:React.FC = (props) => {
    const error = useSelector<AppStateType>(state => state.auth.error) as string
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType>(state=> state.auth.isAuth)
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [password2,setPassword2]= useState('')
    const [form] = Form.useForm();
    const showError = () => {
        if(error) {
            notification.error({
                message: 'Registration error',
                description: error,
                placement: 'topLeft',
                duration: 10,
            });
            dispatch(authActions.setAuthError(''))
        }
    }
    useEffect(showError,[error])
    if(isAuth){
        return <Redirect to="/"/>
    }
    const registerHandler = ()=>{
        dispatch(register(email,password))
    }
    return (
            <Layout>
                <Row justify="center" align="middle" className="h100">
                    <Card className="card">
                        <Form
                            {...formItemLayout}
                            name="register"
                            form={form}
                            onFinish={registerHandler}
                            onFinishFailed={() => {
                            }}
                            scrollToFirstError
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{
                                    required: true,
                                    type: "email",
                                    message: "The input is not valid E-mail!"
                                }]}
                            >
                                <Input onChange={(e) => setEmail(e.target.value)} value={email}/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'},
                                    { min: 5, message: 'Password must be minimum 5 characters.' },]}
                                hasFeedback
                            >
                                <Input.Password onChange={(e) => setPassword(e.target.value)}
                                                value={password}/>
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password onChange={(e) => setPassword2(e.target.value)}
                                                value={password}/>
                            </Form.Item>


                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </Layout>
    );
};

export default Register;