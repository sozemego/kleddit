export interface LoginForm {

    username: string,
    password: string,
    reset: Function,

}


export const createLoginForm = (username: string, password: string): LoginForm => {
    return {
        username,
        password,
        reset: function() {
            this.password = null
        }
    }
}