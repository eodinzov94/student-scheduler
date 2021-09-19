import {Button, Popconfirm, Table} from 'antd';
import React, {useEffect} from 'react';
import './table.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {courseActions, deleteCourse, editCourse, getCoursesData} from "../../redux/reducers/courses-reducer";
import {ICourse} from "../../types/types";
import {CourseCell} from './CourseCell';
import {CloseCircleOutlined} from '@ant-design/icons';
import TasksTable from "./TasksTable";

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
            title: 'Course', dataIndex: 'courseName', key: 'courseId',width:'33%',
            render: (_: any, course: ICourse) => <CourseCell course={course}
                                                             onEdit={(courseName: string) => {
                                                                 dispatch(editCourse(courseName, course.courseId))
                                                             }}
                                                             isNew={course.courseId === 'inputCourse'}

            />,
        },
        {
            title: 'Time for course', dataIndex: 'total', key: 'courseId',width:'33%',
            render: (_: any, course: ICourse) => <span>{calcCourseHours(course)} Hour(s)</span>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'courseId',width:'33%',
            render: (_: any, course: ICourse) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => {
                    dispatch(deleteCourse(course.courseId))
                }}>
                    <a  className='remove-btn'><CloseCircleOutlined /></a>
                </Popconfirm>
            ,

        },
    ];
    let totalHours = data.map(c => calcCourseHours(c)).reduce((sum, courseHours) => sum + courseHours, 0)
    const onClickAdd = () => {
        dispatch(courseActions.inputCourse())
    }
    const isLoading = useSelector<AppStateType>(state => state.courses.isLoading) as boolean
    return (

                <Table
                    className="table h100 minWidth"
                    loading={isLoading}
                    columns={columns}
                    expandable={{
                        expandedRowRender: course => <TasksTable key={course.courseId} course={course}/>,
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



    );
};

export default DataTable;