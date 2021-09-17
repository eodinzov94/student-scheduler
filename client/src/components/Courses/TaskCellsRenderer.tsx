import {ITask} from "../../types/types";
import {Badge, DatePicker, InputNumber, Select, Tag, Form, Input} from "antd";
import React from "react";
import moment from "moment";

export const TaskCellsRenderer = {

    taskType(editModeKey: string, task: ITask) {
        return (
            <>
                {editModeKey === task.key ?
                    <Form.Item>
                        <Select defaultValue={"HW"}>
                            <Select.Option value="HW">HW</Select.Option>
                            <Select.Option value="Assigment">Assigment</Select.Option>
                            <Select.Option value="Exam">Exam</Select.Option>
                            <Select.Option value="MidTermExam">Midterm Exam</Select.Option>
                            <Select.Option value="Other" >Other</Select.Option>
                        </Select>
                    </Form.Item>
                    :
                    <Tag key={task.key}>{task.taskType}</Tag>}
            </>)
    },
    priority(editModeKey: string, task: ITask) {
        return <>{
            editModeKey === task.key ?
                <Form.Item>
                    <Select defaultValue={"Low"}>
                        <Select.Option value="High">High</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Low">Low</Select.Option>
                    </Select>
                </Form.Item>
                :
                <Tag key={task.key} color={"volcano"}>{task.priority.toLocaleUpperCase()}</Tag>}
        </>
    },
    expectedTime(editModeKey: string, task: ITask) {
        return <>{
            editModeKey === task.key ?
                <Form.Item>
                    <InputNumber min={0} max={1000} step={0.1}/>
                </Form.Item>
                :
                <Tag key={task.key}>{(task.expectedTime + ' Hour(s)') || 'unset'}</Tag>}
        </>
    },
    deadline(editModeKey: string, task: ITask) {
        return <>{
            editModeKey === task.key ?
                <Form.Item>
                    <DatePicker defaultValue={moment(moment().format(), 'YYYY-MM-DD')}/>
                </Form.Item>
                :
                <Tag key={task.key}>{task.deadline?.toDate() || 'unset'}</Tag>}
        </>
    },
    status(editModeKey: string, task: ITask) {
        return <>
            {
                editModeKey === task.key ?
                    <Form.Item>
                        <Select defaultValue={task.completed ? 'Finished' : 'Pending'}>
                            <Select.Option value="Finished">Finished</Select.Option>
                            <Select.Option value="Pending">Pending</Select.Option>
                        </Select>
                    </Form.Item>
                    :
                    <span>
                            {task.completed ? <Badge status="success" text={'Finished'}/> :
                                <Badge status="warning" text={'Pending'}/>}
                            </span>

            }
        </>
    },
    timeTook(editModeKey: string, task: ITask) {

    },
    action(editModeKey: string, task: ITask, cancelEdit: (any), save: (any), deleteTaskById: (any), courseId: string) {
        return <>
            {editModeKey === task.key ?
                <>
                    <a onClick={() => cancelEdit(task.taskId)}> Cancel </a> /
                    <a onClick={() => save(task, courseId)}> Save </a>
                </>
                :
                <a onClick={() => deleteTaskById(courseId, task.taskId)}>Delete</a>}
        </>
    }
}