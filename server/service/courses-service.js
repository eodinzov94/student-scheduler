const Course = require('../models/Course')
const ApiError = require('../exceptions/api-error')
const CourseDto = require('../dto/course-dto')

class CoursesService {
    async addCourse(courseName, userId) {
        const course = await Course.create({courseName, userId})
        return CourseDto.courseToDto(course)
    }

    async editCourse(courseId, courseName, userId) {
        const course = await Course.findOne({_id:courseId,userId})
        if (!course) {
            throw ApiError.BadRequest("You can edit only your course")
        }
        course.courseName = courseName
        await course.save()
        return CourseDto.courseToDto(course);
    }

    async getAllCourses(userId) {
        const courses = await Course.find({userId})
        return courses.map(course => CourseDto.courseToDto(course))
    }

    async getOneCourse(courseId, userId) {
        const course = await Course.findOne({_id: courseId, userId})
        return CourseDto.courseToDto(course)
    }

    async deleteCourse(courseId, userId) {
        const course = await Course.findOne({_id: courseId, userId})
        if (!course) {
            throw ApiError.BadRequest("You can delete only your course")
        }
        await Course.findByIdAndDelete(courseId);
    }

    async addTask(task, courseId, userId) {
        const course = await Course.findOneAndUpdate({_id: courseId, userId},
        { $push: { tasks: task  } },{new:true})
        if (!course) {
            throw ApiError.BadRequest("You can edit only your course!")
        }
        await course.save()
        return CourseDto.courseToDto(course)
    }
    async deleteTask (courseId,userId,taskId){
        const course = await Course.findOne({_id: courseId,userId, tasks: {$elemMatch: {_id: taskId}}})
        if (!course) {
            throw ApiError.BadRequest("You can delete only your task")
        }
        course.tasks.pull({_id: taskId})
        await course.save()
        return CourseDto.courseToDto(course)
    }
    async editTask(courseId,userId,taskId,fieldsToUpdate){
        const course = await Course.findOne({_id: courseId,userId, tasks: {$elemMatch: {_id: taskId}}})
        if (!course) {
            throw ApiError.BadRequest("You can edit only your task")
        }
        const updatedCourse = await Course.findOneAndUpdate(
            {_id: courseId, tasks: {$elemMatch: {_id: taskId}}},
            {
                $set: fieldsToUpdate
            },
            {new: true,}
        );
        if(!updatedCourse){
            throw new ApiError (500, "Unknown error")
        }
        return CourseDto.courseToDto(updatedCourse)
    }
    generateNewTaskFromBody(body) {
        return {
            taskType: body.taskType,
            priority: body.priority || "Low",
            expectedTime: body.expectedTime || null,
            deadline: body.deadline || null
        }
    }
    generateTaskFieldsToUpdateFromBody(body){
        const fieldsToUpdate = {}
        if (body.taskType) {
            fieldsToUpdate["tasks.$.taskType"] = body.taskType
        }
        if(body.priority){
            fieldsToUpdate["tasks.$.priority"] =body.priority
        }
        if(body.expectedTime){
            fieldsToUpdate["tasks.$.expectedTime"] = body.expectedTime
        }
        if(body.timeTook!==null && body.timeTook!== undefined){
            fieldsToUpdate["tasks.$.timeTook"] = body.timeTook
        }
        if(body.deadline){
            fieldsToUpdate["tasks.$.deadline"] = body.deadline
        }
        if(body.completed !== null && body.completed !==undefined){
            fieldsToUpdate["tasks.$.completed"] = body.completed
        }
        return fieldsToUpdate
    }
}

module.exports = new CoursesService();