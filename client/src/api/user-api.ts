import $api, {AuthMeResponse} from "./api"

export default class UserService {
    static async changePassword(oldPassword: string, newPassword: string) {
        return $api.patch<AuthMeResponse>('/user/change-password', {oldPassword, newPassword}).then(res => res.data)
    }

    static async changeEmail(email: string){
        return $api.patch<AuthMeResponse>('/user/change-email', {email}).then(res => res.data)
    }

    static async changeName(name:string){
        return $api.patch<AuthMeResponse>('/user/change-name', {name}).then(res => res.data)
    }
}