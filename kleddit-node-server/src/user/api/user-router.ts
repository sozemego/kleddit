import * as express from 'express'
import * as _ from 'lodash'
import { requestLogger } from '../../utils/middlewares/request-logging'
import { default as userService } from '../service/user-service'
import { createRegisterUserForm } from '../dto/register-user-form'
import * as USER_ERRORS from '../error/errors'

const router = express.Router()

router.use(requestLogger)

const errorHandler = (err, req, res, next) => {
    switch (err.message) {
        case USER_ERRORS.USER_DOES_NOT_EXIST: console.log('user does not exist!')
    }
}


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
    if (!username || !password) throw new Error('Registration form requires a username and a password')

    const form = createRegisterUserForm(username, password)
    await userService.registerUser(form)

    res.sendStatus(201)
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

//get user here
router.delete('/single/delete', (req, res) => {
    //todo implement this
})

router.get(`/single/available/:username`, (req, res) => {

})

const base = '/api/0.1/user'

export {
    base,
    router,
    errorHandler
}