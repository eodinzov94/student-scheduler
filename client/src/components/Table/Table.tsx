import {Button, Card, Checkbox, Row, Spin, Table} from 'antd';
import React, {useEffect} from 'react';
import './table.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {addCourse, deleteCourse, editCourse, editTask, getCoursesData} from "../../redux/reducers/courses-reducer";
import {ICourse, ITask} from "../../types/types";
import {CourseCell} from './CourseCell';
import { DeleteOutlined } from '@ant-design/icons';

const DataTable = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCoursesData())
    }, [])
    const columns = [
        {
            title: 'Course', dataIndex: 'courseName', key: 'courseId',
            render: (_: any, course: ICourse) => <CourseCell course={course}
                                                             onEdit={(courseName: string) => {
                                                                 dispatch(editCourse(courseName, course.courseId))
                                                             }}
            isNew={course.courseName==="~New Course~"}/>,
        },
        {title: 'Total time for this course', dataIndex: 'total', key: 'courseId'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'courseId',
            render: (_: any, course: ICourse) => <a onClick={() => {
                dispatch(deleteCourse(course.courseId))
            }}><DeleteOutlined/> Delete</a>,

        },
    ];

    const data = useSelector<AppStateType>(state => state.courses.courses) as ICourse[]
    const onClickAdd = () => {
        dispatch(addCourse("~New Course~"))
    }
    const columns2 = [
        {title: 'Task Type', dataIndex: 'taskType', key: 'taskId'},
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'taskId',
        },
        {title: 'Expected time', dataIndex: 'expectedTime', key: 'taskId'},
        {title: 'Deadline', dataIndex: 'deadline', key: 'taskId'},
        {
            title: 'Completed', dataIndex: 'completed', key: 'taskId',
            render: (_: any, task: ITask) => <Checkbox checked={task.completed} />,
        },
        {title: 'Created at', dataIndex: 'createdAt', key: 'taskId'},

    ];
    const isLoading = useSelector<AppStateType>(state => state.courses.isLoading) as boolean
    return (
            <Row justify="center" align="middle" className="h100">
                <Card className="table h100">
                    <Spin spinning={isLoading}>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: course => <Table
                                columns={columns2} dataSource={course.tasks}
                                pagination={false}/>,
                        }}
                        dataSource={data}
                        size={'middle'}
                    />
                    <Button onClick={onClickAdd}>Add Course</Button>
                    </Spin>
                </Card>
            </Row>
    );
};

export default DataTable;