import {Request, Response, NextFunction} from 'express'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(new Date().toISOString(), `Method ${req.method} called at ${req.baseUrl}${req.url}`)
    next()
}