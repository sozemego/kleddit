import * as jwt from 'jsonwebtoken'
import { LoginForm } from '../dto/login-form'
import {default as userService} from './user-service'
import { UserService } from './user-service'
import * as USER_ERRORS from '../error/errors'
import { matches } from '../utils/password-hash'

const ISSUER = 'kleddit'
const USER_NAME_CLAIM = 'username'
const SECRET = process.env['SECRET'] || 'FALLBACK_STRING'

class AuthService {

    constructor(private userService: UserService) {

    }

    login = async (form: LoginForm): Promise<string> => {
        await this.validateLogin(form)

        return jwt.sign({
            [USER_NAME_CLAIM]: form.username
        }, SECRET,{
            issuer: ISSUER
        })
    }

    private validateLogin = async (form: LoginForm) => {
        const user = await this.userService.getUserByUsername(form.username)

        if(user === null) {
            throw new Error(USER_ERRORS.AUTH_USER_DOES_NOT_EXIST)
        }

        const hash = await this.userService.getUserPasswordHash(form.username)
        const passwordMatches = matches(form.password, hash)
        if(!passwordMatches) {
            throw new Error(USER_ERRORS.INVALID_PASSWORD)
        }

        form.reset()
    }

    validateToken = (token: string): boolean => {
        try {
            this.decodeToken(token)
            return true
        } catch(e) {
            return false
        }
    }

    private decodeToken = (token: string): object | string => {
        return jwt.verify(token, SECRET)
    }

    getUsernameClaim = (token: string): string => {
        const decodedToken = this.decodeToken(token)
        const claim = decodedToken[USER_NAME_CLAIM]
        if(!claim) {
            throw new Error('INVALID USERNAME CLAIM')
        }
        return claim
    }

}

export default new AuthService(userService)