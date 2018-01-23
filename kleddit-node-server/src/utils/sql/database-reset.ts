import * as pg from 'pg'
import {readFile} from "../file/file-utils";

const DB_USER = process.env['KLEDDIT_DB_USER']
const DB_PASS = process.env['KLEDDIT_DB_PASS']
const HOST = '127.0.0.1'
const DB  = 'kleddit-test' //TODO later load from config

/**
 * Logic of this method is very straightforward, because it's used only
 * for testing.
 * @returns {Promise<void>}
 */
export const resetDatabase = async () => {

    //1. load sql from file
    const sql = await readFile('../sql/create-database.sql')
    //2. connect to db
    const client = new pg.Client({
        user: DB_USER,
        password: DB_PASS,
        host: HOST,
        port: 5432,
        database: DB,
    })

    await client.connect()

    //3. execute
    await client.query(sql)

    console.log('database reset')
    return client.end()
}