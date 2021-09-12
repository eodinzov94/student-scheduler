import {BaseThunkType, InferActionsTypes} from '../Store';
import {ICourse, ITask} from "../../types/types";
import CoursesService from "../../api/course-api";

let initialState = {
    courses: [] as ICourse[],
    error: '',
    isLoading: false
};

export enum CourseActions {
    SET_COURSES_DATA,
    ADD_COURSE,
    EDIT_COURSE,
    DELETE_COURSE,
    EDIT_TASK,
    DELETE_TASK,
    ADD_TASK,
    SET_LOADING,
    SET_ERROR
}

const coursesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case CourseActions.SET_LOADING:
        case CourseActions.SET_ERROR:
        case CourseActions.SET_COURSES_DATA:
            return {
                ...state,
                ...action.payload
            }
        case CourseActions.ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload.course]
            }
        case CourseActions.EDIT_COURSE:
        case CourseActions.ADD_TASK:
        case CourseActions.EDIT_TASK:
        case CourseActions.DELETE_TASK:
            return {
                ...state,
                courses: [...state.courses.filter(c => c.courseId !== action.payload.course.courseId), action.payload.course]
            }
        case CourseActions.DELETE_COURSE:
            return {
                ...state,
                courses: [...state.courses.filter(c => c.courseId !== action.payload.courseId)]
            }

        default:
            return state;
    }
}

export const courseActions = {
    setCoursesData: (courses: ICourse[]) => ({type: CourseActions.SET_COURSES_DATA, payload: {courses}} as const),
    deleteCourse: (courseId: string) => ({type: CourseActions.DELETE_COURSE, payload: {courseId}} as const),
    addNewCourse: (course: ICourse) => ({type: CourseActions.ADD_COURSE, payload: {course}} as const),
    editCourse: (course: ICourse) => ({type: CourseActions.EDIT_COURSE, payload: {course}} as const),
    addNewTask: (course: ICourse) => ({type: CourseActions.ADD_TASK, payload: {course}} as const),
    editTask: (course: ICourse) => ({type: CourseActions.EDIT_TASK, payload: {course}} as const),
    deleteTask: (course: ICourse) => ({type: CourseActions.DELETE_TASK, payload: {course}} as const),
    setLoading: (loading: boolean) => ({type: CourseActions.SET_LOADING, payload: {isLoading:loading}} as const),
    setError: (msg: string) => ({type: CourseActions.SET_ERROR, payload: {error: msg}} as const),
}



export const thunkTemplate = (thunkBody:(any)): ThunkType => async (dispatch) => {
    try {
        if (localStorage.getItem('accessToken')) {
            dispatch(courseActions.setLoading(true))
            thunkBody()
        }
    } catch (e:any) {
        const msg = e.message || 'Unknown error'
        dispatch(courseActions.setError(msg))
    }finally {
        dispatch(courseActions.setLoading(false))
    }
}

export const getCoursesData = (): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=>{
        let {courses} = await CoursesService.getAllCourses()
        dispatch(courseActions.setCoursesData(courses))
    })
}
export const addCourse = (courseName:string): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=>{
        const {course} = await CoursesService.addCourse(courseName)
        dispatch(courseActions.addNewCourse(course))
    })
}
export const editCourse = (courseName:string,courseId:string): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=>{
        const {course} = await CoursesService.editCourse(courseId,courseName)
        dispatch(courseActions.editCourse(course))
    })
}
export const deleteCourse = (courseId:string): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=> {
        await CoursesService.deleteCourse(courseId)
        dispatch(courseActions.deleteCourse(courseId))
    })
}
export const addTask = (courseId:string,task:ITask): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=> {
        const {course} = await  CoursesService.addTask(courseId,task)
        dispatch(courseActions.addNewTask(course))
    })
}
export const editTask = (courseId:string,task:ITask): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=> {
        const {course} = await  CoursesService.editTask(courseId,task)
        dispatch(courseActions.editTask(course))
    })
}
export const deleteTask = (courseId:string,taskId:string): ThunkType => async (dispatch) => {
    thunkTemplate(async ()=> {
        const {course} = await  CoursesService.deleteTask(courseId,taskId)
        dispatch(courseActions.deleteTask(course))
    })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof courseActions>
type ThunkType = BaseThunkType<ActionsType>

export default coursesReducer;
