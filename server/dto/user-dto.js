module.exports = class UserDto {
    id;
    email;
    createDate;
    name;
    constructor(id, email, createDate,name) {
        this.name = name
        this.id = id
        this.email = email
        this.createDate = createDate
    }
}