import React, {FC, useEffect, useState} from "react";
import {ICourse, ITask} from "../../types/types";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {addTask, courseActions, deleteTask, editTask} from "../../redux/reducers/courses-reducer";
import {Button, Table, Typography} from "antd";
import {InputSelector, ShowComponentSelector} from "./TaskComponentsFactory";
import {PlusOutlined} from "@ant-design/icons";
import {EditableTaskCell} from "./EditableTaskCell";
import {AppStateType} from "../../redux/Store";


interface TasksProps {
    course:ICourse
}
const NewTask:ITask={
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




const TasksTable: FC<TasksProps> = ({course}) => {
    const {tasks, courseId} = course;
    const dispatch = useDispatch()
    const editableTask = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    const setEditableTask=(task:ITask | null)=>{
        dispatch(courseActions.setInputTask(task))
    }
    const [tasksData, setTasksData] = useState(tasks)
    useEffect(()=>
    {
        console.log('useEffect tasks called');
        setTasksData(tasks)}
        ,[tasks])
    const isEditing = (task: ITask) => editableTask?.key ===task?.key  ;
    const onAdd = () => {
        setEditableTask(NewTask);
        setTasksData(prevState => [...prevState, NewTask])
    }
    const edit = (task: ITask) => {
        console.log('edit func');
        setEditableTask(task)
    };
    const cancel = () => {
        if (editableTask?.key === 'inputTask') {
            setTasksData(prevState => [...prevState.filter(t => t.key !== 'inputTask')])
        }
        setEditableTask(null)
    };
    const save = () => {
        if(editableTask?.key==='inputTask'){
            dispatch(addTask(courseId,editableTask as ITask))
            setEditableTask(null)
        }
        else if (editableTask){
            dispatch(editTask(courseId,editableTask))
            setEditableTask(null)
        }
    };
    const deleteTaskById = (courseId: string, taskId: string) => {
        dispatch(deleteTask(courseId, taskId))
    }
    const columns = [
        {title: 'Task Type', dataIndex: 'taskType', key: 'taskId', editable: true},
        {title: 'Priority', dataIndex: 'priority', key: 'taskId', editable: true},
        {title: 'Expected time', dataIndex: 'expectedTime', key: 'taskId', editable: true},
        {title: 'Deadline', dataIndex: 'deadline', key: 'taskId', editable: true},
        {title: 'Status', dataIndex: 'completed', key: 'taskId', editable: true},
        {title: 'Created at', dataIndex: 'createdAt', key: 'taskId', editable: false},
        {
            title: 'Action', key: 'taskId', editable: false, render: (_: any, task: ITask) => {
                const editable = isEditing(task);
                return editable ? (
                    <span>
            <a onClick={() => save()} style={{marginRight: 8}}>
              Save
            </a>
              <a onClick={cancel}>Cancel</a>
          </span>
                ) : (<span>
                    <Typography.Link disabled={!!editableTask} onClick={()=>edit(task)}>
                        Edit
                    </Typography.Link> /
                        <Typography.Link disabled={!!editableTask} onClick={()=>deleteTaskById(courseId,task.taskId)}>
                        Delete
                    </Typography.Link>
                    </span>
                );
            }
        }

    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            render: ShowComponentSelector(col.dataIndex as string),
            onCell: (task: ITask) => ({
                task,
                setInputTask:setEditableTask,
                InputComponent: InputSelector(col.dataIndex as string),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(task),
            }),
        };
    });
    return (
        <Table
            components={{
                body: {
                    cell: EditableTaskCell,
                },
            }}
            bordered
            dataSource={tasksData}
            columns={mergedColumns}
            pagination={false}
            footer={() => <Button onClick={onAdd} shape="circle"><PlusOutlined/></Button>}
        />
    );
};

export default TasksTable;