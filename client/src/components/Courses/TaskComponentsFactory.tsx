import {ITask} from "../../types/types";
import {Badge, DatePicker, Input, InputNumber, Select, Tag, Tooltip} from "antd";
import React, {FC, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import moment from "moment";
import {getPriorityColor} from "../../utils/HelpFunctions";
import {EditOutlined, QuestionCircleOutlined} from "@ant-design/icons";

export const ShowComponentSelector = (dataIndex: string, edit: (task: ITask) => void) => {
    switch (dataIndex) {
        case 'taskType':
            return (_: any, task: ITask) => <Tag key={task.key} className='tag'
                                                 onClick={() => edit(task)}>{task.taskType}</Tag>
        case 'priority':
            return (_: any, task: ITask) => {
                const color = getPriorityColor(task.priority)
                return (
                    <Tag onClick={() => edit(task)}
                         key={task.key} color={color} className='tag'>{task.priority.toLocaleUpperCase()}</Tag>)
            }
        case 'expectedTime':
            return (_: any, task: ITask) => (
                <Tag onClick={() => edit(task)}
                     key={task.key} className='tag'>{task.expectedTime ? task.expectedTime + ' Hour(s)' : null}</Tag>)
        case 'timeTook':
            return (_: any, task: ITask) => {
                const timeTook = task.completed ? (task.timeTook ? task.timeTook + ' Hour(s)' : null) : null
                let color = 'default';
                if (timeTook && task.expectedTime) {
                    color = (task.expectedTime - (task.timeTook as number) >= 0) ? 'success' : 'red'
                }
                return (
                    <Tag onClick={() => edit(task)}
                         key={task.key} className='tag' color={color}>{timeTook}</Tag>)
            }
        case 'deadline':
            return (_: any, task: ITask) => <Tag key={task.key} onClick={() => edit(task)}
                                                 className='tag'>{task.deadline ?
                moment(task.deadline).format('YYYY-MM-DD')
                : null}</Tag>
        case 'completed':
            return (_: any, task: ITask) => (<span className='status' onClick={() => edit(task)}>
        {task.completed ? <Badge status="success" text={'Finished'}/> :
            <Badge status="warning" text={'Pending'}/>}
    </span>)
        default :
            return () => <span>Non Exist dataIndex : {dataIndex}</span>
    }
}


export interface InputProps {
    setTask: React.Dispatch<React.SetStateAction<ITask | null>>
}


const TaskTypeInput: FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    const [writeMode, setWriteMode] = useState(false)
    return (
        <>
            {writeMode ? <Input onChange={(e) => {
                    if (e.target.value !== task?.taskType) {
                        setTask({...task as ITask, taskType: e.target.value})
                    }
                }
                } value={task?.taskType} autoFocus={true}/>
                :
                <Select value={task?.taskType || 'HW'}
                        onChange={(value) => {
                            if (value !== task?.taskType && value !== 'Other') {
                                setTask({...task as ITask, taskType: value})
                            } else if (value === 'Other') {
                                setWriteMode(true)
                            }
                        }} className="w100">
                    <Select.Option value="HW">HW</Select.Option>
                    <Select.Option value="Assigment">Assigment</Select.Option>
                    <Select.Option value="Exam">Exam</Select.Option>
                    <Select.Option value="MidTermExam">Midterm Exam</Select.Option>
                    <Select.Option value="Other"><EditOutlined /></Select.Option>
                </Select>
            }
        </>

    );
};


const PriorityInput: FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <Select value={task?.priority} onChange={(value) => {
            if (task?.priority) {
                setTask({...task, priority: value})
            }
        }} className="w100">
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
        </Select>
    );
};

const ExpectedTimeInput: FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    const InputValue = (task && task.expectedTime) ? task.expectedTime : undefined
    return (
        <InputNumber min={0} max={1000} step={0.1} value={InputValue} onChange={
            (value) => {
                if (value !== task?.expectedTime) {
                    setTask({...task as ITask, expectedTime: value})
                }
            }
        }/>
    );
};


const TimeTookInput: FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    const InputValue = (task && task.timeTook) ? task.timeTook : undefined
    return (
        <>
            {!task?.completed ?<Tooltip title="Status 'Finished' should be selected to activate this field"
                                        ><QuestionCircleOutlined /> </Tooltip>
                :
                <InputNumber min={0} max={1000} step={0.1} value={InputValue} disabled={!task?.completed}
                             onChange={
                                 (value) => {
                                     if (value !== task?.timeTook) {
                                         setTask({...task as ITask, timeTook: value})
                                     }
                                 }
                             }/>
            }

        </>
    );
};


const DeadlineInput: FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <DatePicker className="w100"
            onSelect={(value) => {
                if (value !== task?.deadline) {
                    setTask({...task as ITask, deadline: value})
                }
            }}/>
    );
};

const CompletedInput: FC<InputProps> = ({setTask}) => {
    const task = useSelector<AppStateType>(state => state.courses.inputTask) as ITask | null
    return (
        <Select value={task?.completed ? 'Finished' : 'Pending'} className="w100"
                onChange={(value) => {
                    const completed = value === 'Finished'
                    setTask({...task as ITask, completed, timeTook: 0})
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
        case 'timeTook':
            return TimeTookInput
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
