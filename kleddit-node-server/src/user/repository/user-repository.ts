import pool from '../../utils/sql/pool'
import { Pool } from 'pg'
import { convertToUsers } from '../entity/entity-converter'
import { User, UserEntity } from '../entity/user'
import { USER_ALREADY_EXISTS } from '../error/errors'

export class UserRepository {

    constructor(private pool: Pool) {

    }

    getAllUsers = async (): Promise<User[]> => {
        const client = await this.pool.connect()
        const result = await client.query('SELECT * FROM users')

        await client.release()
        return convertToUsers(result)
    }

    /**
     * Adding entity here, which includes password hash.
     * In different places we only deal with User, which
     * does not include the hash.
     * @param {UserEntity} user
     * @returns {Promise<void>}
     */
    addUser = async (user: UserEntity): Promise<void> => {
        const client = await this.pool.connect()

        const query = `INSERT INTO users VALUES($1, $2, $3, $4, $5)`

        try {
            const result = await client.query(query, [
                user.userId, user.createdAt, user.nuked, user.passwordHash, user.username
            ])
        } catch (e) {
            throw new Error(USER_ALREADY_EXISTS)
        }

    }

    getUserByUsername = async (username: string | null): Promise<User> => {
        const client = await this.pool.connect()
        const result = await client.query('SELECT * FROM users AS u WHERE u.username = $1', [username])

        await client.release()

        const users = convertToUsers(result)
        return users.length ? users[0] : null
    }

    isUsernameAvailable = async (username: string): Promise<Boolean> => {
        const client = await this.pool.connect()
        const result = await client.query('SELECT COUNT(u.username) FROM users AS u WHERE u.username = $1', [username])

        await client.release()
        return !(+result.rows[0].count)
    }

}

export default new UserRepository(pool)