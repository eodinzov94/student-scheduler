import $api ,{AuthResponse,AuthMeResponse} from "./api"
export default class AuthService {
    static async login(email: string, password: string) {
        return $api.post<AuthResponse>('/auth/login', {email, password}).then(res => res.data)
    }

    static async register(email: string, password: string,name:string){
        return $api.post<AuthResponse>('/auth/register', {email, password,name}).then(res => res.data)
    }

    static async me(){
        return $api.get<AuthMeResponse>('/auth/me').then(res => res.data)
    }

}