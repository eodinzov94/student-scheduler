import {ITask} from "../../types/types";
import {Badge, DatePicker, Input, InputNumber, Select, Tag} from "antd";
import React, {FC} from "react";
import moment from "moment";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";

export const ShowComponentSelector = (dataIndex: string) => {
    switch (dataIndex) {
        case 'taskType':
            return (_: any, task: ITask) => <Tag key={task.key} className='tag'>{task.taskType}</Tag>
        case 'priority':
            return (_: any, task: ITask) => (
                <Tag key={task.key} color={"volcano"} className='tag'>{task.priority.toLocaleUpperCase()}</Tag>)
        case 'expectedTime':
            return (_: any, task: ITask) => (
                <Tag key={task.key} className='tag'>{(task.expectedTime + ' Hour(s)') || 'unset'}</Tag>)
        case 'deadline':
            return (_: any, task: ITask) => <Tag key={task.key}
                                                 className='tag'>{task.deadline}</Tag>
        case 'completed':
            return (_: any, task: ITask) => (<span className='tag'>
        {task.completed ? <Badge status="success" text={'Finished'}/> :
            <Badge status="warning" text={'Pending'}/>}
    </span>)
        default :
            return () => <span>Non Exist dataIndex : {dataIndex}</span>
    }
}


export interface InputProps {
    setTask:React.Dispatch<React.SetStateAction<ITask | null>>
}



const TaskTypeInput:FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        (
            <Select value={task?.taskType || 'HW'}
                    onChange={(value) => {
                        if (value !== task?.taskType) {
                            setTask({...task as ITask, taskType:value})
                        }
                    }}>
                <Select.Option value="HW">HW</Select.Option>
                <Select.Option value="Assigment">Assigment</Select.Option>
                <Select.Option value="Exam">Exam</Select.Option>
                <Select.Option value="MidTermExam">Midterm Exam</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
            </Select>)
    );
};




const PriorityInput:FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <Select value={task?.priority} onChange={(value) => {
            if (task?.priority) {
                setTask({...task, priority:value})
            }
        }}>
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
        </Select>
    );
};

const ExpectedTimeInput:FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <InputNumber min={0} max={1000} step={0.1} defaultValue={task?.expectedTime || 0} onChange={
            (value) => {
                if (value !== task?.expectedTime) {
                    setTask({...task as ITask, expectedTime:value})
                }
            }
        }/>
    );
};

const DeadlineInput:FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <DatePicker
            defaultValue={ moment(moment().format(), 'YYYY-MM-DD')}
            onSelect={(value) => {
                if (value !== task?.deadline) {
                    setTask({...task as ITask, deadline:value})
                }
            }}/>
    );
};

const CompletedInput:FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <Select defaultValue={task?.completed ? 'Finished' : 'Pending'}
                onChange={(value) => {
                    setTask({...task as ITask, completed:value === 'Finished' ? true : false})
                }}>
            <Select.Option value="Finished">Finished</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
        </Select>
    );
};
export const InputSelector = (dataIndex: string) => {
    switch (dataIndex) {
        case 'taskType':
            return TaskTypeInput
        case 'priority':
            return PriorityInput
        case 'expectedTime':
            return ExpectedTimeInput
        case 'deadline':
            return DeadlineInput
        case 'completed':
            return CompletedInput
        default :
            return Input
    }

}
