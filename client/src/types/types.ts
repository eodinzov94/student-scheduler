import { Moment } from "moment";
export interface IUser {
    name: string | null
    userId: string | null
    email: string | null
    createDate: Moment | string
}

export interface ICourse {
    courseId: string
    key:string
    courseName: string
    tasks: ITask[]
}

export interface ITask {
    taskId: string
    key: string
    taskType:string
    priority:string
    expectedTime:number | null
    deadline: Moment | null
    completed:boolean
    timeTook:number | null
    createdAt: Moment | string
}

export interface IEvent {
    key:string
    date:Moment
    courseName: string
    tasks: ITask[]
}