import * as express from 'express'
import * as _ from 'lodash'
import { requestLogger } from '../../utils/middlewares/request-logging'
import { default as userService } from '../service/user-service'
import { default as authService } from '../service/auth-service'
import { createRegisterUserForm } from '../dto/register-user-form'
import { errorHandler } from '../error/handlers'
import * as USER_ERRORS from '../error/errors'
import { auth } from '../../utils/middlewares/auth'
import { createLoginForm } from '../dto/login-form'

const router = express.Router()

router.use(requestLogger)

//TODO remove
router.get('/all', async (req, res) => {
    const users = await userService.getAllUsers()
    return res.send(users)
})

//todo rate limit
router.post('/register', async (req, res, next) => {
    const body = _.get(req, 'body', null)
    if (!body) throw new Error('Registration requires a register form')

    const username = _.get(body, 'username', null)
    const password = _.get(body, 'password', null)
    if (!username || !password) return next(new Error(USER_ERRORS.USERNAME_TOO_SHORT))

    const form = createRegisterUserForm(username, password)
    try {
        await userService.registerUser(form)
        res.sendStatus(201).end()
    } catch (e) {
        return next(e)
    }
})

router.get('/single/:username', async (req, res, next) => {
    const username = _.get(req, 'params.username', null)
    try {
        const user = await userService.getUserByUsername(username)
        res.send(user).end()
    } catch (e) {
        next(e)
    }
})

router.delete('/single/delete', auth, async (req, res) => {
    const username = _.get(req, `user.username`, null)
    if(username === null) {
        throw new Error(USER_ERRORS.AUTH_USER_DOES_NOT_EXIST)
    }

    await userService.deleteUser(username)
    res.sendStatus(200)
})

router.get(`/single/available/:username`, async (req, res) => {
    const username = _.get(req, 'params.username', null)
    const isAvailable = await userService.isUsernameAvailable(username)
    res.send(isAvailable)
})

router.post(`/auth/login`, async (req, res, next) => {

    const body = _.get(req, 'body', null)
    const username = _.get(body, 'username', null)
    const password = _.get(body, 'password', null)

    if (!username || !password) return next(new Error(USER_ERRORS.USERNAME_TOO_SHORT))

    const form = createLoginForm(username, password)

    const token = await authService.login(form)
    res.send({jwt: token})
})

const base = '/api/0.1/user'

export {
    base,
    router,
    errorHandler
}