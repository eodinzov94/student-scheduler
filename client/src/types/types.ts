import { Moment } from "moment";
export interface IUser {
    userId: string | null
    email: string | null
    isAdmin: boolean
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
