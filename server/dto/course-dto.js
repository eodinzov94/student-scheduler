const TaskDto = require('../dto/task-dto')

module.exports = class CourseDto {
    courseId;
    courseName;
    tasks;
    key;
    constructor(courseId, courseName, tasks) {
        this.courseId = courseId
        this.courseName = courseName
        this.key = courseId
        this.tasks = tasks
    }

    static courseToDto(course) {
        return new CourseDto(
            course._id, course.courseName, TaskDto.tasksToDtoArray(course.tasks))
    }
}