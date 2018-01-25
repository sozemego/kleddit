import * as _ from 'lodash'
import * as winston from 'winston'
import {v4 as uuid} from 'uuid'

import { UserRepository } from '../repository/user-repository'
import {default as userRepository} from '../repository/user-repository'
import { RegisterUserForm } from '../dto/register-user-form'
import * as USER_ERRORS from '../error/errors'
import { hashWithSalt } from '../utils/password-hash'
import { User, UserEntity } from '../entity/user'

export class UserService {

    private usernameValidator: RegExp
    private maxUsernameLength: number
    private maxPasswordLength: number

    constructor(private userRepository: UserRepository) {
        this.usernameValidator = new RegExp(/^[a-zA-Z0-9_-]+$/)
        this.maxUsernameLength = 38
        this.maxPasswordLength = 128
    }

    getAllUsers = async () => {
        return this.userRepository.getAllUsers()
    }

    private validateForm = (form: RegisterUserForm) => {
        const {username, password} = form

        this.validateUsername(username)
        this.validatePassword(password)
    }

    private validateUsername = (username: string) => {
        //check characters, only alphanumeric allowed
        if(!this.usernameValidator.test(username)) {
            throw new Error(USER_ERRORS.INVALID_USERNAME_CHARACTERS)
        }

        if(username.length > this.maxUsernameLength) {
            throw new Error(USER_ERRORS.USERNAME_TOO_LONG)
        }
    }

    private validatePassword = (password: string) => {
        if(password.length > this.maxPasswordLength) {
            throw new Error(USER_ERRORS.PASSWORD_TOO_LONG)
        }
    }

    registerUser = async (form: RegisterUserForm): Promise<User> => {
        //1. validate form
        this.validateForm(form)

        //2. hash password
        const hash = hashWithSalt(form.password)

        const userEntity: UserEntity = {
            userId: uuid(),
            createdAt: new Date(),
            nuked: false,
            username: form.username,
            passwordHash: hash
        }

        await this.userRepository.addUser(userEntity)
        winston.info(`Registered user ${form.username}`)
        return <User>_.omit(userEntity, 'passwordHash');
    }

    getUserByUsername = async (username: string) => {
        const user = await this.userRepository.getUserByUsername(username)

        if(user === null) {
            throw new Error(USER_ERRORS.USER_DOES_NOT_EXIST)
        }

        return user
    }

    isUsernameAvailable = async (username: string) => {
        return this.userRepository.isUsernameAvailable(username)
    }

}

export default new UserService(userRepository)