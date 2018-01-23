import { UserRepository } from '../repository/user-repository'
import {default as userRepository} from '../repository/user-repository'
import { RegisterUserForm } from '../dto/register-user-form'
import * as USER_ERRORS from '../error/errors'
import { hashWithSalt } from '../utils/password-hash'
import {v4 as uuid} from 'uuid'
import { User, UserEntity } from '../entity/user'

export class UserService {

    constructor(private userRepository: UserRepository) {

    }

    getAllUsers = async () => {
        return this.userRepository.getAllUsers()
    }

    private validateForm = (form: RegisterUserForm) => {
        //1. validate username
        //this.validateUsername(form.username)

        //2. validate password
        //this.validatePassword(form.password)
    }

    registerUser = async (form: RegisterUserForm) => {

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
        return Promise.resolve()
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