import { AxiosResponse } from 'axios'

export namespace ResponseAsserts {

    export const assertResponseIsOk = (response: AxiosResponse) => {
        expect(response.status).toBe(200)
    }

    export const assertResponseIsBadRequest = (response: AxiosResponse) => {
        expect(response.status).toBe(400)
    }

    export const assertResponseIsNotFound = (response: AxiosResponse) => {
        expect(response.status).toBe(404)
    }

    export const assertResponseIsUnauthorized = (response: AxiosResponse) => {
        expect(response.status).toBe(401)
    }

    export const assertResponseIsCreated = (response: AxiosResponse) => {
        expect(response.status).toBe(201)
    }

}

