import {ICourse, ITask} from "../types/types";
import {CheckOutlined} from "@ant-design/icons";
import moment from "moment";
import React from "react";

export const getColorAndTimeLeft = (task: ITask) => {
    let date
    if (task.completed) {
        date = <CheckOutlined/>
    } else {
        if (task.deadline) {
            date = moment(task.deadline).endOf('day').fromNow()
            date = date.startsWith('in') ? date.replace('in ', '') + ' left' : date
        } else {
            date = null
        }
    }
    let color;
    if (typeof date === 'string') {
        color = date.includes('ago') ? 'warning' : 'green'
    } else if (date) {
        color = 'green'
    } else {
        color = 'default'
    }
    return {date, color}
}

export const checkTaskChanges = (before: ITask, after: ITask | undefined) => {
    if (after === undefined) {
        return false
    }
    return before.taskType !== after.taskType || before.expectedTime !== after.expectedTime ||
        moment(before.deadline).format('YYYY-MM-DD') !== moment(after.deadline).format('YYYY-MM-DD')
        || before.completed !== after.completed || before.priority !== after.priority || before.timeTook !== after.timeTook
}

export const calcCourseHours = (course: ICourse) => {
    return course.tasks.map(t => t.expectedTime ? t.expectedTime : 0).reduce((sum, expectedTime) => sum + expectedTime, 0)
}
export const getPriorityColor = (priority: string) => {
    switch (priority.toLocaleUpperCase()) {
        case 'HIGH':
            return 'volcano'
        case 'MEDIUM':
            return 'processing'
        case 'LOW':
            return 'green'
        default:
            return 'default'
    }

}

export const getEventColor = (priority: string) => {
    switch (priority.toLocaleUpperCase()) {
        case 'HIGH':
            return 'error'
        case 'MEDIUM':
            return 'warning'
        case 'LOW':
            return 'success'
        default:
            return 'default'
    }

}


export const priorityToNumber = (priority: string) => {
    switch (priority.toLocaleUpperCase()) {
        case 'HIGH':
            return 3
        case 'MEDIUM':
            return 2
        case 'LOW':
            return 1
        default:
            return 0
    }
}
function f1(){

}