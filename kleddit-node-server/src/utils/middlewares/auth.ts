import {Request, Response, NextFunction} from 'express'
import {default as authService} from '../../user/service/auth-service'

const HEADER = 'Authorization'
const AUTHENTICATION_SCHEME = "BEARER"

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.get(HEADER)
    if(!isTokenBased(authorization)) {
        return unauthorized(res)
    }

    const token = authorization.substr(AUTHENTICATION_SCHEME.length).trim()

    try {
        req.user = {
            username: authService.getUsernameClaim(token)
        }
    } catch (e) {
        return unauthorized(res)
    }

    next()
}

const unauthorized = (res: Response) => {
    res.status(401).send()
}

const isTokenBased = (header: string | undefined) => {
    if(!header) {
        return false;
    }
    return header.toUpperCase().startsWith(AUTHENTICATION_SCHEME)
}