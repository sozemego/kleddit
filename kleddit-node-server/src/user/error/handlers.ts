import * as _ from 'lodash'
import * as USER_ERRORS from './errors'
import { createErrorResponse } from '../../utils/http/error-response'

export const errorHandler = (err, req, res, next) => {
    switch (err.message) {
        case USER_ERRORS.USER_DOES_NOT_EXIST: return handleUserDoesNotExist(err, req, res)
        case USER_ERRORS.USER_ALREADY_EXISTS: return handleUserAlreadyExists(err, req, res)
        case USER_ERRORS.USERNAME_TOO_LONG: return handleUsernameTooLong(err, req, res)
        case USER_ERRORS.INVALID_USERNAME_CHARACTERS: return handleUsernameIllegalCharacters(err, req, res)
    }
    // next()
}

const handleUserDoesNotExist = (err, req, res) => {
    const code = 404
    const data = {
        field: 'username',
    }
    const errorResponse = createErrorResponse(code, '', data)
    res.status(code).send(errorResponse)
}

const handleUserAlreadyExists = (err, req, res) => {
    const code = 400
    const data = {
        field: 'username',
    }
    const errorResponse = createErrorResponse(code, 'User already exists', data)
    res.status(code).send(errorResponse)
}

const handleUsernameIllegalCharacters = (err, req, res) => {
    const code = 400
    const data = {
        field: 'username',
    }
    const errorResponse = createErrorResponse(code, 'Username contains illegal characters, only alphanumeric and _ allowed', data)
    res.status(code).send(errorResponse)
}

const handleUsernameTooLong = (err, req, res) => {
    const code = 400
    const data = {
        field: 'username',
    }
    const errorResponse = createErrorResponse(code, 'Username too long', data)
    res.status(code).send(errorResponse)
}