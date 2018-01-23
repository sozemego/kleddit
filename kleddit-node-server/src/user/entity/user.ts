export interface User {
    userId: string,
    createdAt: Date,
    nuked: boolean,
    username: string
}

export interface UserEntity extends User {

    passwordHash: string,

}