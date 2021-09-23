import {Button, Popconfirm, Table} from 'antd';
import React, {useEffect, useMemo} from 'react';
import './table.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {courseActions, deleteCourse, editCourse, getCoursesData} from "../../redux/reducers/courses-reducer";
import {ICourse} from "../../types/types";
import {CourseCell} from './CourseCell';
import {CloseCircleOutlined} from '@ant-design/icons';
import TasksTable from "./TasksTable";
import {calcCourseHours} from '../../utils/HelpFunctions';

const roundToOneDecimal = (num:number) => Math.round(num *10)/10
const DataTable = () => {
    const dispatch = useDispatch()
    const data = useSelector<AppStateType>(state => state.courses.courses) as ICourse[]
    let coursesHoursCalc = useMemo(()=>data.map(course => ({key:course.key, courseTotal:roundToOneDecimal(calcCourseHours(course))}) ),[data])
    let totalHours = useMemo(()=>(roundToOneDecimal(coursesHoursCalc.
    map(c => c.courseTotal).reduce((sum, courseHours) => sum + courseHours, 0))),[coursesHoursCalc])
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
            render: (_: any, course: ICourse) => <span>{coursesHoursCalc.find(({key})=> key === course.key)?.courseTotal || '0'} Hour(s)</span>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'courseId',
            render: (_: any, course: ICourse) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => {
                    dispatch(deleteCourse(course.courseId))
                }}>
                    <a  className='remove-btn'><CloseCircleOutlined /></a>
                </Popconfirm>
            ,
        },
    ];
    const onClickAdd = () => {
        dispatch(courseActions.inputCourse())
    }
    const isLoading = useSelector<AppStateType>(state => state.courses.isLoading) as boolean
    return (

                <Table

                    scroll={{  x: '100vh' }}
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