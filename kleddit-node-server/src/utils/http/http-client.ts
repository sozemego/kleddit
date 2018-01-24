import axios from 'axios'
import { AxiosError, AxiosInstance } from 'axios'
import { AxiosResponse } from 'axios'
import { AxiosRequestConfig } from 'axios'
import * as _ from 'lodash'

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
        console.log(`post payload: ${JSON.stringify(data)}`)
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
    console.log(new Date().toISOString(), `Making a ${config.method.toUpperCase()} to ${config.baseURL}${config.url}`)
    return config
}

const logErrorInterceptor = (error: any): any => {
    console.log('ERROR')
    console.log(error.message)
    console.log(_.get(error, `response.data`))
    throw error
}

const logResponseInterceptor = (response: AxiosResponse) => {
    console.log(new Date().toISOString(), 'NORMAL RESPONSE', response.data)
    return response
}

const errorResponseInterceptor = (error: AxiosError) => {
    logErrorInterceptor(error)
    return error.response
}