import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Form, Input, notification, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {
    changeEmail,
    changeName,
    changePassword,
    getUser,
    InitialStateType,
    profileActions
} from "../../redux/reducers/profile-reducer";
import {EditOutlined, SaveOutlined, UndoOutlined} from "@ant-design/icons";
import moment from "moment";

const Profile: FC = () => {
    useEffect(() => {
        dispatch(getUser())
    }, [])
    const state = useSelector<AppStateType>(state => state.profile) as InitialStateType
    const dispatch = useDispatch()
    const [emailEdit, setEmailEdit] = useState(false)
    const [nameEdit, setNameEdit] = useState(false)
    const [pwEdit, setPwEdit] = useState(false)
    const [email, setEmail] = useState(state.email)
    const [name, setName] = useState(state.name)
    const [pw, setPw] = useState('')
    const [pw2, setPw2] = useState('')
    const [pwPrev, setPwPrev] = useState('')
    if (state.error) {
        notification.error({
            message: 'Error',
            description: state.error,
            placement: 'topLeft',
            duration: 10,
        });
        dispatch(profileActions.setError(''))
    }
    if (state.success) {
        notification.success({
            message: 'Success',
            description: state.success,
            placement: 'topLeft',
            duration: 10,
        });
        dispatch(profileActions.setSuccess(''))
    }
    return (
                <Card className="profile-card" title="My profile">
                    <Spin spinning={state.isLoading}>
                        <div className={'profile-block'}>
                            {emailEdit ?
                                <Form
                                    layout="inline"
                                    name="email"
                                    scrollToFirstError
                                    autoComplete="off"
                                    onFinish={() => {
                                        dispatch(changeEmail(email))
                                        setEmailEdit(false)
                                    }}
                                >
                                            <span className={'profile-data'}>
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
                                        </span>
                                    <span className={'profile-action'}>
                                            <Form.Item>
                                            <Button type="link" onClick={() => setEmailEdit(false)}>
                                                    <UndoOutlined/>
                                                </Button>
                                                <Button type="link" htmlType="submit">
                                                    <SaveOutlined/>
                                                </Button>
                                                </Form.Item>
                                        </span>
                                </Form>
                                :
                                <div className={'profile-block-item'}>
                                    <span className={'profile-data'}><b>Email:</b> {state.email} </span>
                                    <span className={'profile-action'}>
                                            <Button type="link" onClick={() => setEmailEdit(true)}>
                                                    <EditOutlined/>
                                                </Button>
                                            </span>
                                </div>}
                            {nameEdit ?
                                <Form
                                    onFinish={() => {
                                        dispatch(changeName(name))
                                        setNameEdit(false)
                                    }}
                                    className={'profile-block-item'}
                                    name="name"
                                    scrollToFirstError
                                    autoComplete="off"
                                >
                                        <span className={'profile-data'}>
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[{
                                                required: true,
                                                message: "The input is required!"
                                            }]}
                                        >
                                            <Input onChange={(e) => setName(e.target.value)} value={name}/>
                                        </Form.Item>

                                            </span>
                                    <span className={'profile-action'}>
                                                <Button type="link" onClick={() => setNameEdit(false)}>
                                                    <UndoOutlined/>
                                                </Button>
                                                <Button type="link" htmlType="submit">
                                                    <SaveOutlined/>
                                                </Button>
                                        </span>
                                </Form>
                                :
                                <div className={'profile-block-item'}>
                                    <span className={'profile-data'}><b>Name:</b> {state.name} </span>
                                    <span className={'profile-action'}>
                                            <Button type="link" onClick={() => setNameEdit(true)}>
                                                    <EditOutlined/>
                                                </Button>
                                            </span>
                                </div>}

                            {pwEdit ?
                                <Form
                                    onFinish={() => {
                                        dispatch(changePassword(pwPrev, pw))
                                        setPwEdit(false)
                                    }}
                                    className={'profile-block-item'}
                                    name="password"
                                    scrollToFirstError
                                    autoComplete="off"
                                >
                                    <span className={'profile-data'}>
                                        <Form.Item

                                            label="Current Password"
                                            name="currentPassword"
                                            rules={[{
                                                required: true,
                                                message: "The input is required!"
                                            }]}
                                            hasFeedback
                                        >
                                            <Input.Password onChange={(e) => setPwPrev(e.target.value)}
                                                            value={pwPrev}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{required: true, message: 'Please input your password!'},
                                                {min: 5, message: 'Password must be minimum 5 characters.'},]}
                                            hasFeedback
                                        >
                                            <Input.Password onChange={(e) => setPw(e.target.value)}
                                                            value={pw}/>
                                        </Form.Item>

                                        <Form.Item
                                            label="Confirm Password"
                                            name="confirm"
                                            className={'profile-block-item'}
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({getFieldValue}) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password onChange={(e) => setPw2(e.target.value)}
                                                            value={pw2}/>
                                        </Form.Item>
                                        </span>
                                    <span className={'profile-action'}>
                                                <Button type="link" onClick={() => setPwEdit(false)}>
                                                    <UndoOutlined/>
                                                </Button>
                                                <Button type="link" htmlType="submit">
                                                    <SaveOutlined/>
                                                </Button>
                                        </span>
                                </Form>
                                :
                                <div className={'profile-block-item'}>
                                    <span className={'profile-data'}><b>Password: ******</b></span>
                                    <span className={'profile-action'}>
                                                <Button type="link" onClick={() => setPwEdit(true)}>
                                                        <EditOutlined/>
                                                    </Button>
                                                </span>
                                </div>
                            }

                            <div className={'profile-block-item'}>
                                <span><b>Create Date:</b> {moment(state.createDate).format('YYYY-MM-DD')}</span>
                            </div>
                        </div>
                    </Spin>
                </Card>
    );
};

export default Profile;