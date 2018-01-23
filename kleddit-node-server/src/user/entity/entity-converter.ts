import { QueryResult } from 'pg'
import { User } from './user'

/**
 * Converts an array of results to array of Users.
 * Remember to always ignore password_hash and don't return it anywhere.
 * Password hash will only be used in auth methods.
 * @param {QueryResult} result
 * @returns {User[]}
 */
export const convertToUsers = (result: QueryResult): User[] => {
    return result.rows.map(row => {
        return {
            userId: row.user_id,
            createdAt: row.created_at,
            nuked: row.nuked,
            username: row.username,
        }
    })
}

