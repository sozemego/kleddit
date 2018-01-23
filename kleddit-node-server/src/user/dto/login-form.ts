export interface LoginForm {

    username: string,
    password: string,

}

export const createLoginForm = (username: string, password: string) => {
    return { username, password }
}