import React, {FC, useEffect, useState} from "react";
import {ICourse, ITask} from "../../types/types";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {addTask, courseActions, deleteTask, editTask} from "../../redux/reducers/courses-reducer";
import {Button, Table, Tag} from "antd";
import {InputSelector, ShowComponentSelector} from "./TaskComponentsFactory";
import {CloseCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {EditableTaskCell} from "./EditableTaskCell";
import {AppStateType} from "../../redux/Store";
import {checkTaskChanges, getColorAndTimeLeft, priorityToNumber} from "../../utils/HelpFunctions";


interface TasksProps {
    course: ICourse
}
const NewTask: ITask = {
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
    const [tasksData, setTasksData] = useState(tasks)
    useEffect(()=>{
        if(editableTask && editableTask.key === 'inputTask'){
            dispatch(courseActions.setInputTask(null))
        }
    },[])
    const setEditableTask = (task: ITask | null) => {
        dispatch(courseActions.setInputTask(task))
    }
    useEffect(() => {
        setTasksData(tasks)
    }, [tasks])
    const isEditing = (task: ITask) => editableTask?.key === task?.key;
    const onAdd = () => {
        setEditableTask(NewTask);
        setTasksData(prevState => [...prevState, NewTask])
    }
    const edit = (task: ITask) => {
        setEditableTask(task)
    };
    useEffect(()=> {
        if(tasksData.find(t=>t.key==='inputTask') && editableTask?.key !== 'inputTask'){
            setTasksData(prevState => prevState.filter(t=>t.key!=='inputTask'))
        }
    },[editableTask])
    const cancel = () => {
        setEditableTask(null)
    };
    const save = () => {
        if (editableTask?.key === 'inputTask') {
            dispatch(addTask(courseId, editableTask as ITask))
            setEditableTask(null)
        } else if (editableTask) {
            if (checkTaskChanges(editableTask, tasks.find(t => t.key === editableTask.key))) {
                dispatch(editTask(courseId, editableTask))
            }
            setEditableTask(null)
        }
    };
    const deleteTaskById = (courseId: string, taskId: string) => {
        dispatch(deleteTask(courseId, taskId))
    }
    const columns = [
        {title: 'Task Type', dataIndex: 'taskType', key: 'taskId', editable: true ,width:'17%',},
        {title: 'Priority', dataIndex: 'priority', key: 'taskId', editable: true ,width:'12%',filterMultiple:true,
            filters: [
                { text: 'High', value: 'HIGH' },
                { text: 'Medium', value: 'MEDIUM' },
                { text: 'Low', value: 'LOW' },
            ],
            sorter: {
                compare: (a:ITask, b:ITask) =>priorityToNumber(a.priority)-priorityToNumber(b.priority) ,
                multiple:1
            },
            onFilter: (value:boolean | string |number, task:ITask) => task.priority.toLocaleUpperCase() === value,
        },
        {title: 'Expected time', dataIndex: 'expectedTime', key: 'taskId', editable: true,width:'12%'},
        {title: 'Actual time', dataIndex: 'timeTook', key: 'taskId', editable: true,width:'12%'},
        {title: 'Deadline', dataIndex: 'deadline', key: 'taskId', editable: true,width:'15%'},
        {
            title: 'Time left', key: 'taskId', editable: false, render:
                (_: any, task: ITask) => {
                    const {date,color} = getColorAndTimeLeft(task)
                    return <Tag key={task.key} color={color as string}>
                        {date}</Tag>
                }
        },
        {title: 'Status', dataIndex: 'completed',  editable: true,width:'12%',filterMultiple:true,
            filters: [
                { text: 'Finished', value: true },
                { text: 'Pending', value: false },
            ],
            sorter: {
                compare: (a:ITask, b:ITask) =>  (+a.completed)- (+b.completed),
                multiple:2
            },
            onFilter: (value:boolean | string |number, task:ITask) => task.completed === value,
        },

        {
            title: 'Action', key: 'taskId', editable: false,width:'8%', render: (_: any, task: ITask) => {
                const editable = isEditing(task);
                return editable ? (
                    <span>
            <a onClick={() => save()} style={{marginRight: 8}}>
              Save
            </a>
              <a onClick={cancel}>Cancel</a>
          </span>
                ) : (<span>
                        <a className='remove-btn'
                           onClick={() => deleteTaskById(courseId, task.taskId)}>
                        <CloseCircleOutlined/>
                    </a>
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
            render: ShowComponentSelector(col.dataIndex as string, edit),
            onCell: (task: ITask) =>{
                return {
                task,
                setInputTask: setEditableTask,
                InputComponent: InputSelector(col.dataIndex as string),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(task)
                }
            },
        };
    });
    return (
        <Table
            className="gridtable"
            components={{
                body: {
                    cell: EditableTaskCell,
                },
            }}
            bordered
            dataSource={tasksData}
            columns={mergedColumns}
            pagination={false}
            rowClassName="task-row"
            footer={() => <Button disabled={editableTask?.key==='inputTask'} onClick={onAdd} shape="circle"><PlusOutlined/></Button>}
        />
    );
};

export default TasksTable;