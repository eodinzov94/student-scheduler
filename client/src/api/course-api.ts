import $api ,{CoursesResponse,CourseResponse,Response} from "./api"
import {ITask} from "../types/types";
export default class CoursesService {
    static async getAllCourses() {
        return $api.get<CoursesResponse>('/courses/').then(res => res.data)
    }
    static async getOneCourses(courseId:string) {
        return $api.get<CourseResponse>('/courses/'+courseId).then(res => res.data)
    }
    static async addCourse(courseName: string){
        return $api.post<CourseResponse>('/courses/add-course', {courseName}).then(res => res.data)
    }

    static async editCourse(courseId:string,courseName:string){
        return $api.patch<CourseResponse>('/courses/edit-course/'+courseId,{courseName}).then(res => res.data)
    }
    static async deleteCourse(courseId:string){
        return $api.delete<Response>('/courses/delete-course/'+courseId,).then(res => res.data)
    }
    static async addTask(courseId:string,task:ITask){
        return $api.post<CourseResponse>('/courses/add-task/'+courseId, {...task}).then(res => res.data)
    }
    static async deleteTask(courseId:string,taskId:string){
        return $api.delete<CourseResponse>(`/courses/delete-task/${courseId}&${taskId}`,).then(res => res.data)
    }
    static async editTask(courseId:string,task:ITask){
        return $api.put<CourseResponse>(`/courses/edit-task/${courseId}&${task.taskId}`,{...task}).then(res => res.data)
    }
}