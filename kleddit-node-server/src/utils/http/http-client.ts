import axios from 'axios'
import { AxiosError, AxiosInstance } from 'axios'
import { AxiosResponse } from 'axios'
import { AxiosRequestConfig } from 'axios'
import * as _ from 'lodash'
import * as winstonModule from 'winston'

const winston = new winstonModule.Logger({
    level: 'info',
    transports: [
        new winstonModule.transports.Console({
            colorize: true,
            timestamp: true,
            level: 'info',
        })
    ]
})

export class HttpClient {

    private instance: AxiosInstance
    private token: string

    constructor(path: string) {
        this.instance = axios.create({baseURL: path})
        this.instance.interceptors.request.use(logRequestInterceptor, logErrorInterceptor)
        this.instance.interceptors.response.use(logResponseInterceptor, errorResponseInterceptor)
    }

    get = async (url: string): Promise<AxiosResponse> => {
        return this.instance.get(url)
    }

    getEntity = async <T>(url: string, typeFactory: (json: object) => T): Promise<T> => {
        const response = await this.get(url)
        return typeFactory(response.data)
    }

    post = async (url: string, data?: any): Promise<AxiosResponse> => {
        winston.info(`post payload: ${JSON.stringify(data)}`)
        return this.instance.post(url, data)
    }

    delete = async (url: string): Promise<AxiosResponse> => {
        return this.instance.delete(url)
    }

    setToken = (token: string) => {
        this.token = token
    }

}

const logRequestInterceptor = (config: AxiosRequestConfig) => {
    winston.info(new Date().toISOString(), `Making a ${config.method.toUpperCase()} to ${config.baseURL}${config.url}`)
    return config
}

const logErrorInterceptor = (error: any): any => {
    winston.info('ERROR')
    winston.info(error.message)
    winston.info(_.get(error, `response.data`))
    throw error
}

const logResponseInterceptor = (response: AxiosResponse) => {
    winston.info(new Date().toISOString(), 'NORMAL RESPONSE', response.data)
    return response
}

const errorResponseInterceptor = (error: AxiosError) => {
    logErrorInterceptor(error)
    return error.response
}