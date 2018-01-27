import * as express from 'express'
import { base as userBasePath, errorHandler, router } from './user/api/user-router'
import * as winston from 'winston'
import { AUTH_USER_DOES_NOT_EXIST } from './user/error/errors'

winston.remove(winston.transports.Console)
winston.add(
    winston.transports.Console, {
        colorize: true,
        timestamp: true,
        level: 'info',
    }
)

const app = express()

app.use(express.json())
app.use(userBasePath, router)
app.use(userBasePath, errorHandler)

app.use('*', (err, req, res, next) => {
    switch (err.message) {
        case AUTH_USER_DOES_NOT_EXIST: return res.send(401)
    }
    next()
})

const port = 8080
app.listen(port, (err) => {
    if (err) console.log(err)

    // TODO make custom reporting log that lists all routes mounted
    // var route, routes = [];
    //
    // app._router.stack.forEach(function(middleware){
    //     if(middleware.route){ // routes registered directly on the app
    //         routes.push(middleware.route);
    //     } else if(middleware.name === 'router'){ // router middleware
    //         middleware.handle.stack.forEach(function(handler){
    //             route = handler.route;
    //             route && routes.push(route);
    //         });
    //     }
    // });
    //
    // console.log(routes)

    console.log(`Server is listening on port ${port}`)
})

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
