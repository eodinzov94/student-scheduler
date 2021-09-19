import {AppDispatch, BaseThunkType, InferActionsTypes} from '../Store';
import {ICourse, ITask} from "../../types/types";
import CoursesService from "../../api/course-api";


const inputCourse:ICourse = {
    courseId: 'inputCourse',
    key:'inputCourse',
    courseName:"",
    tasks: [],
}

let initialState = {
    courses: [] as ICourse[],
    error: '',
    isLoading: false,
    inputTask:null as (null | ITask)
};

export enum CourseActions {
    SET_COURSES_DATA='SET_COURSES_DATA',
    ADD_COURSE='ADD_COURSE',
    EDIT_COURSE='EDIT_COURSE',
    DELETE_COURSE='DELETE_COURSE',
    EDIT_TASK='EDIT_TASK',
    DELETE_TASK='DELETE_TASK',
    ADD_TASK='ADD_TASK',
    SET_LOADING='SET_LOADING',
    SET_ERROR='SET_ERROR',
    INPUT_COURSE='INPUT_COURSE',
    REMOVE_INPUT_COURSE ='REMOVE_INPUT_COURSE',
    SET_INPUT_TASK = 'SET_INPUT_TASK'
}

const coursesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case CourseActions.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case CourseActions.SET_ERROR:
        case CourseActions.SET_COURSES_DATA:
            return {
                ...state,
                ...action.payload
            }
        case CourseActions.INPUT_COURSE:
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
                courses: state.courses.map(
                    course => course.courseId === action.payload.course.courseId ? action.payload.course : course)
            }
        case CourseActions.DELETE_COURSE:
            return {
                ...state,
                courses: [...state.courses.filter(c => c.courseId !== action.payload.courseId)]
            }
        case CourseActions.REMOVE_INPUT_COURSE:
            return {
                ...state,
                courses: state.courses.filter(c=>c.courseId!=='inputCourse')
            }
        case CourseActions.SET_INPUT_TASK:
            return {
                ...state,
                inputTask: action.payload.inputTask
            }
        default:
            return state;
    }
}

export const courseActions = {
    removeInputCourse: ()=> ({type: CourseActions.REMOVE_INPUT_COURSE} as const),
    inputCourse: () => ({type: CourseActions.INPUT_COURSE, payload: {course:inputCourse}} as const),
    setCoursesData: (courses: ICourse[]) => ({type: CourseActions.SET_COURSES_DATA, payload: {courses}} as const),
    deleteCourse: (courseId: string) => ({type: CourseActions.DELETE_COURSE, payload: {courseId}} as const),
    addNewCourse: (course: ICourse) => ({type: CourseActions.ADD_COURSE, payload: {course}} as const),
    editCourse: (course: ICourse) => ({type: CourseActions.EDIT_COURSE, payload: {course}} as const),
    addNewTask: (course: ICourse) => ({type: CourseActions.ADD_TASK, payload: {course}} as const),
    editTask: (course: ICourse) => ({type: CourseActions.EDIT_TASK, payload: {course}} as const),
    deleteTask: (course: ICourse) => ({type: CourseActions.DELETE_TASK, payload: {course}} as const),
    setLoading: (loading: boolean) => ({type: CourseActions.SET_LOADING, payload: {isLoading: loading}} as const),
    setError: (msg: string) => ({type: CourseActions.SET_ERROR, payload: {error: msg}} as const),
    setInputTask:(task:(ITask | null)) =>({type: CourseActions.SET_INPUT_TASK, payload: {inputTask:task}} as const),
}


export const thunkTemplate = async (thunkBody: (any),dispatch:AppDispatch)=> {
    try {
        if (localStorage.getItem('accessToken')) {
            dispatch(courseActions.setLoading(true))
            await thunkBody()
        }
    } catch (e: any) {
        const msg = e.message || 'Unknown error'
        dispatch(courseActions.setError(msg))
    } finally {
        dispatch(courseActions.setLoading(false))
    }
}

export const getCoursesData = (): ThunkType => async (dispatch) => {
   await thunkTemplate(async () => {
        const {courses} = await CoursesService.getAllCourses()
        dispatch(courseActions.setCoursesData(courses))
    },dispatch)
}

export const addCourse = (courseName: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const {course} = await CoursesService.addCourse(courseName)
        dispatch(courseActions.addNewCourse(course))
    },dispatch)
}
export const editCourse = (courseName: string, courseId: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const {course} = await CoursesService.editCourse(courseId, courseName)
        dispatch(courseActions.editCourse(course))
    },dispatch)
}
export const deleteCourse = (courseId: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        await CoursesService.deleteCourse(courseId)
        dispatch(courseActions.deleteCourse(courseId))
    },dispatch)
}
export const addTask = (courseId: string, task: ITask): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const {course} = await CoursesService.addTask(courseId, task)
        dispatch(courseActions.addNewTask(course))
    },dispatch)
}
export const editTask = (courseId: string, task: ITask): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const {course} = await CoursesService.editTask(courseId, task)
        dispatch(courseActions.editTask(course))
    },dispatch)
}
export const deleteTask = (courseId: string, taskId: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const {course} = await CoursesService.deleteTask(courseId, taskId)
        dispatch(courseActions.deleteTask(course))
    },dispatch)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof courseActions>
type ThunkType = BaseThunkType<ActionsType>

export default coursesReducer;
