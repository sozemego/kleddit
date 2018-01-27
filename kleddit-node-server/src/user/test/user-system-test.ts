import { HttpClient } from '../../utils/http/http-client'
import { resetDatabase } from '../../utils/sql/database-reset'
import { createRegisterUserForm } from '../dto/register-user-form'
import { ResponseAsserts } from '../../utils/http/response-asserts'
import { createSimpleUserDto } from '../dto/simple-user-dto'
import { fromAxiosError } from '../../utils/http/error-response'
import { createLoginForm } from '../dto/login-form'
import { AxiosError } from 'axios'

const basePath = 'http://localhost:8080/api/0.1/user'

const register = `/register`
const singleUser = `/single`
const deleteUser = `/single/delete`
const available = `/single/available`
const login = `/auth/login`

const client = new HttpClient(basePath)

beforeEach(async () => {
    return resetDatabase()
})

describe('creating new user', () => {
    it('should create a new user', async () => {
        const username = 'sozemego'
        const registerUserForm = createRegisterUserForm(username, 'password')

        const response = await client.post(register, registerUserForm)
        expect(response.status).toBe(201)
        ResponseAsserts.assertResponseIsCreated(response)

        const dto = await client.getEntity(`${singleUser}/${username}`, createSimpleUserDto)
        expect(dto.username).toBe(username)
    })
    it('should not create a user if it already exists', async () => {
        expect.assertions(4)
        const username = 'sozemego'
        ResponseAsserts.assertResponseIsCreated(await client.post(register, createRegisterUserForm(username, 'password')))

        try {
            await client.post(register, createRegisterUserForm(username, 'password'))
        } catch (e) {
            const response: AxiosError = e
            ResponseAsserts.assertResponseIsBadRequest(response)
            const errorResponse = fromAxiosError(response)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }

    })
    it('should not create user with space inside name', async () => {
        expect.assertions(2)
        try {
            await client.post(register, createRegisterUserForm('some whitespace', 'password'))
        } catch (e) {
            const errorResponse = fromAxiosError(<AxiosError>e)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }
    })
    it('should not create user with space after name', async () => {
        expect.assertions(2)
        try {
            await client.post(register, createRegisterUserForm('some_whitespace_after_this   ', 'password'))
        } catch (e) {
            const errorResponse = fromAxiosError(<AxiosError>e)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }

    })
    it('should not create user with space before name', async () => {
        expect.assertions(2)

        try {
            await client.post(register, createRegisterUserForm('    legit_username', 'password'))
        } catch (e) {
            const errorResponse = fromAxiosError(<AxiosError>e)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }
    })
    it('should not create user with white space only', async () => {
        expect.assertions(2)
        try {
            await client.post(register, createRegisterUserForm('      ', 'password'))
        } catch (e) {
            const errorResponse = fromAxiosError(<AxiosError>e)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }
    })
    it('should not create user with illegal characters', async () => {
        expect.assertions(2)
        try {
            await client.post(register, createRegisterUserForm('[]@#$', 'password'))
        } catch (e) {
            const errorResponse = fromAxiosError(<AxiosError>e)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }
    })
    it('should create user with all allowable characters', async () => {
        expect.assertions(1)
        const response = await client.post(register, createRegisterUserForm('qwertyuiopasdfghjklzxcvbnm1234567890-_', 'password'))
        ResponseAsserts.assertResponseIsCreated(response)
    })
    it('should create username and then find it ignoring case', async () => {
        expect.assertions(1)
        await client.post(register, createRegisterUserForm('case', 'password'))
        const dto = await client.getEntity(`${singleUser}/CASE`, createSimpleUserDto)
        expect(dto.username).toBe('case')
    })
    it('should not create username with too long name', async () => {
        expect.assertions(2)

        const username = new Array(500).fill('a').join('')
        try {
            await client.post(register, createRegisterUserForm(username, 'password'))
        } catch (e) {
            const errorResponse = fromAxiosError(<AxiosError>e)
            expect(errorResponse.statusCode).toBe(400)
            expect(errorResponse.data.field).toBe('username')
        }
    })
    it('should not create user with empty password', async () => {
        expect.assertions(1)
        try {
            await client.post(register, createRegisterUserForm('name', ''))
        } catch (e) {
            ResponseAsserts.assertResponseIsBadRequest(<AxiosError>e)
        }
    })
    it('should not create user with too long password', async () => {
        expect.assertions(1)
        try {
            await client.post(register, createRegisterUserForm('name', new Array(500).fill('n').join('')))
        } catch (e) {
            ResponseAsserts.assertResponseIsBadRequest(<AxiosError>e)
        }
    })
})
describe('finding user', () => {
    it('it should not find non-existent user', async () => {
        try {
            await client.get(`${singleUser}/user_name`)
        } catch (e) {
            ResponseAsserts.assertResponseIsNotFound(<AxiosError>e)
        }
    })
})

describe('deleting user', () => {
    it('it should not delete user without authorization', async () => {
        const username = 'sozemego'
        await client.post(register, createRegisterUserForm(username, 'password'))

        try {
            await client.delete(deleteUser)
        } catch (e) {
            ResponseAsserts.assertResponseIsUnauthorized(<AxiosError>e)
        }
    })
    it('it should delete user when authorized', async () => {
        const username = 'sozemego'
        const password = 'password'
        await client.post(register, createRegisterUserForm(username, password))

        let response = await client.post(login, createLoginForm(username, password))

        const data = response.data.jwt
        client.setToken(data)

        response = await client.delete(deleteUser)
        ResponseAsserts.assertResponseIsOk(response)
        try {
            await client.get(`${singleUser}/${username}`)
        } catch (e) {
            ResponseAsserts.assertResponseIsNotFound(<AxiosError>e)
        }
    })
})

describe('username availability', () => {
    it('should return true for non-existent user', async () => {
        const isAvailable = await client.getEntity(`${available}/NOPE`, (res) => res)
        expect(isAvailable).toBe(true)
    })
    it('should return false for existing user', async () => {
        const username = 'a'
        await client.post(register, createRegisterUserForm(username, 'b'))
        const isAvailable = await client.getEntity(`${available}/${username}`, (res) => res)
        expect(isAvailable).toBe(false)
    })
    it('should return false for deleted user', async () => {
        const username = 'a'
        const password = 'b'
        await client.post(register, createRegisterUserForm(username, password))

        let response = await client.post(login, createLoginForm(username, password))

        const token = response.data.jwt
        client.setToken(token)
        await client.delete(deleteUser)

        const isAvailable = await client.getEntity(`${available}/${username}`, (res) => res)
        expect(isAvailable).toBe(false)
    })
})