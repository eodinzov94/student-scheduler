import { Moment } from "moment";
export interface IUser {
    userId: string | null
    email: string | null
    isAdmin: boolean
}

export interface ICourse {
    courseId: string
    courseName: string
    tasks: ITask[]
}

export interface ITask {
    taskId: string
    taskType:string
    priority:string
    expectedTime:number
    deadline: Moment
    completed:boolean
    timeTook:number
}