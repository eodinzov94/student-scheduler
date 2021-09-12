import {Card, Checkbox, Row, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import './table.css'
const DataTable = () => {
    const columns = [
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Total time for this course', dataIndex: 'total', key: 'total' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <><a>Edit</a> / <a>Delete</a></>,

        },
    ];

    const data = [
        {
            key: 1,
            course: 'Calculus I',
            total:4,
            tasks:[
                {taskType:"HW",priority:"Low",expectedTime:4,deadline:moment().format(),completed:false,timeTook:null},
                {taskType:"HW2",priority:"Medium",expectedTime:6,deadline:moment().format(),completed:false,timeTook:null}
            ]
        },
        {
            key: 2,
            course: 'Calculus II',
        },
        {
            key: 3,
            course: 'Calculus III',
        },
        {
            key: 4,
            course: 'Calculus I',
            total:4,
            tasks:[
                {taskType:"HW",priority:"Low",expectedTime:4,deadline:moment().format(),completed:false,timeTook:null},
                {taskType:"HW2",priority:"Medium",expectedTime:6,deadline:moment().format(),completed:false,timeTook:null}
            ]
        },
        {
            key:5,
            course: 'Calculus I',
            total:4,
            tasks:[
                {taskType:"HW",priority:"Low",expectedTime:4,deadline:moment().format(),completed:false,timeTook:null},
                {taskType:"HW2",priority:"Medium",expectedTime:6,deadline:moment().format(),completed:false,timeTook:null}
            ]
        },
        {
            key: 6,
            course: 'Calculus I',
            total:4,
            tasks:[
                {taskType:"HW",priority:"Low",expectedTime:4,deadline:moment().format(),completed:false,timeTook:null},
                {taskType:"HW2",priority:"Medium",expectedTime:6,deadline:moment().format(),completed:false,timeTook:null}
            ]
        },
    ];
    const columns2 = [
        { title: 'Task Type', dataIndex: 'taskType', key: 'taskType' },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
        },
        { title: 'Expected time', dataIndex: 'expectedTime', key: 'expectedTime' },
        { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' },
        { title: 'Completed', dataIndex: 'completed', key: 'completed',
            render: () => <Checkbox />,},
    ];
    return (
        <div>
            <Row justify="center" align="middle" className="h100">
            <Card className="table h100">
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: course => <Table columns={columns2} dataSource={course.tasks}
                                                        pagination={false}/>,
                    rowExpandable: course => !!course.tasks
                }}
                dataSource={data}
                size={'middle'}
            />
            </Card>
            </Row>
        </div>
    );
};

export default DataTable;