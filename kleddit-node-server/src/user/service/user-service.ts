import { UserRepository } from '../repository/user-repository'
import {default as userRepository} from '../repository/user-repository'
import { RegisterUserForm } from '../dto/register-user-form'
import * as USER_ERRORS from '../error/errors'
import { hashWithSalt } from '../utils/password-hash'
import {v4 as uuid} from 'uuid'
import { User, UserEntity } from '../entity/user'
import * as _ from 'lodash'

export class UserService {

    private usernameValidator: RegExp
    private maxUsernameLength: number

    constructor(private userRepository: UserRepository) {
        this.usernameValidator = new RegExp(/^[a-zA-Z0-9_-]+$/)
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

    }

    registerUser = async (form: RegisterUserForm): User => {

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
        return _.omit(userEntity, 'passwordHash')
    }

    getUserByUsername = async (username: string) => {
        const user = await this.userRepository.getUserByUsername(username)

        if(user === null) {
            throw new Error(USER_ERRORS.USER_DOES_NOT_EXIST)
        }

        return user
    }

}

export default new UserService(userRepository)