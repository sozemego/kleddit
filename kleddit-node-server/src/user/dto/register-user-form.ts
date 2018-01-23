export interface RegisterUserForm {

    username: string,
    password: string,

}

export const createRegisterUserForm = (username: string, password: string): RegisterUserForm => {
    return {
        username,
        password,
    }
}