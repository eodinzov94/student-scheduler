module.exports = class UserDto {
    id;
    email;
    createDate;

    constructor(id, email, createDate) {
        this.id = id
        this.email = email
        this.createDate = createDate
    }
}