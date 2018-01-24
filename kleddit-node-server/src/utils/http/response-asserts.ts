import { AxiosError, AxiosResponse } from 'axios'

export namespace ResponseAsserts {

    export const assertResponseIsOk = (response: AxiosResponse) => {
        expect(response.status).toBe(200)
    }

    export const assertResponseIsBadRequest = (error: AxiosError) => {
        expect(error.response.status).toBe(400)
    }

    export const assertResponseIsNotFound = (error: AxiosError) => {
        expect(error.response.status).toBe(404)
    }

    export const assertResponseIsUnauthorized = (error: AxiosError) => {
        expect(error.response.status).toBe(401)
    }

    export const assertResponseIsCreated = (response: AxiosResponse) => {
        expect(response.status).toBe(201)
    }

}

