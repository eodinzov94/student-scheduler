import {Button, Card, Row, Table} from 'antd';
import React, {useEffect} from 'react';
import './table.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {courseActions, deleteCourse, editCourse, getCoursesData} from "../../redux/reducers/courses-reducer";
import {ICourse} from "../../types/types";
import {CourseCell} from './CourseCell';
import {DeleteOutlined} from '@ant-design/icons';
import Tasks from "./Tasks";

const DataTable = () => {
    const calcCourseHours = (course: ICourse) => {
        return course.tasks.map(t => t.expectedTime ? t.expectedTime : 0).reduce((sum, expectedTime) => sum + expectedTime, 0)
    }
    const dispatch = useDispatch()
    const data = useSelector<AppStateType>(state => state.courses.courses) as ICourse[]
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
                                                             isNew={course.courseId === 'inputCourse'}

            />,
        },
        {
            title: 'Time for course', dataIndex: 'total', key: 'courseId',
            render: (_: any, course: ICourse) => <span>{calcCourseHours(course)} Hour(s)</span>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'courseId',
            render: (_: any, course: ICourse) => <a onClick={() => {
                dispatch(deleteCourse(course.courseId))
            }}><DeleteOutlined/> Delete</a>,

        },
    ];
    let totalHours = data.map(c => calcCourseHours(c)).reduce((sum, courseHours) => sum + courseHours, 0)
    const onClickAdd = () => {
        dispatch(courseActions.inputCourse())
    }
    const isLoading = useSelector<AppStateType>(state => state.courses.isLoading) as boolean
    return (
        <Row justify="center" align="middle" className="h100">
            <Card className="table h100">
                <Table
                    loading={isLoading}
                    columns={columns}
                    expandable={{
                        expandedRowRender: course => <Tasks key={course.courseId} tasks={course.tasks} courseId={course.courseId}/>,
                    }}
                    dataSource={data}
                    pagination={false}
                    footer={() => <>
                        <hr/>
                        <div style={{justifyContent: "space-between", display: "flex"}}>
                            <Button onClick={onClickAdd} shape="round">Add Course</Button>
                            <span>Total: <strong>{totalHours} Hour(s)</strong> </span>
                        </div>
                    </>}
                />


            </Card>
        </Row>
    );
};

export default DataTable;