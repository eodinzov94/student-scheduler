import React, {FC, useEffect, useState} from 'react';
import {Button, Table} from "antd";
import {ITask} from "../../types/types";
import moment from 'moment';
import {PlusOutlined} from '@ant-design/icons';
import {TaskCellsRenderer} from "./TaskCellsRenderer";
import {useDispatch} from "react-redux";
import {addTask, deleteTask} from "../../redux/reducers/courses-reducer";

interface TasksProps {
    tasks: ITask[]
    courseId:string
}




const Tasks: FC<TasksProps> = ({tasks,courseId}) => {
    const generateNewTask = ():ITask => {
        return  {
            taskId: 'inputTask',
            key: 'inputTask',
            taskType: 'New Task',
            priority: 'LOW',
            completed: false,
            createdAt: moment().format(),
            deadline: null,
            expectedTime: null,
            timeTook: null
        }
    }
    const dispatch = useDispatch()
    let [editModeKey, setEditModeKey] = useState('')
    const [tasksData, setTasksData] = useState(tasks)
    useEffect(()=>setTasksData(tasks),[tasks])
    const save = (task:ITask, courseId:string) => {
        dispatch(addTask(courseId,task))
        cancelEdit(task.taskId)
    }
    const deleteTaskById = (courseId:string,taskId:string) => {
        dispatch(deleteTask(courseId,taskId))
    }
    const onAdd = () => {
        let newTask: ITask = generateNewTask()
        setTasksData(prevState => [...prevState, newTask])
        setEditModeKey(newTask.key)
    }
    const onCell = (task: ITask, index: number | undefined) => {
        return {
            onDoubleClick: () => {
                setEditModeKey(task.key)
            },
        }
    }
    const cancelEdit = (taskId: string) => {
        if (taskId === 'inputTask') {
            setTasksData(prevState => prevState.filter(t => t.taskId !== 'inputTask'))
        }
        setEditModeKey('')
    }
    const columns = [
        {
            title: 'Task Type', dataIndex: 'taskType', key: 'taskId',
            render: (_: any, task: ITask) =>
                TaskCellsRenderer.taskType(editModeKey,task), onCell,
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'taskId',
            render:(_: any, task: ITask)=> TaskCellsRenderer.priority(editModeKey,task), onCell,
        },
        {
            title: 'Expected time', dataIndex: 'expectedTime', key: 'taskId',
            render: (_: any, task: ITask) =>
                TaskCellsRenderer.expectedTime(editModeKey,task), onCell, width: 40
        },

        {
            title: 'Deadline', dataIndex: 'deadline', key: 'taskId',
            render: (_: any, task: ITask) =>
                TaskCellsRenderer.deadline(editModeKey,task)  , onCell,
        },
        {
            title: 'Status', dataIndex: 'completed', key: 'taskId',
            render: (_: any, task: ITask) =>
                TaskCellsRenderer.status(editModeKey,task)  ,
            onCell,
        },
        {title: 'Created at', dataIndex: 'createdAt', key: 'taskId', editable: false},
        {
            title: 'Action', key: 'taskId', render: (_: any, task: ITask) =>
                TaskCellsRenderer.action(editModeKey,task,cancelEdit,save,deleteTaskById,courseId)  ,
        }

    ];
    console.log("Tasks Render called for courseID :",courseId);
    return (
        <Table columns={columns} dataSource={tasksData} pagination={false}
               footer={() => <Button onClick={onAdd} shape="circle"><PlusOutlined/></Button>}
        />
    );
};

export default Tasks;