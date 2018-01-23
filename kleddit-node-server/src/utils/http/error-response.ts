import { AxiosResponse } from 'axios'

export interface ErrorResponse {

    statusCode: number,
    error: string,
    data: {
        field?: string
    },

}

export const createErrorResponse = (statusCode: number, error: string, data: object): ErrorResponse => {
    return {
        statusCode,
        error,
        data,
    }
}

export const fromAxiosResponse = (response: AxiosResponse): ErrorResponse => {
    const statusCode = response.status
    const error = response.data.error
    const data = response.data.data
    return createErrorResponse(statusCode, error, data)
}