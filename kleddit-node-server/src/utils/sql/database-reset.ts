import * as pg from 'pg'
import {readFile} from "../file/file-utils";

const DB_USER = process.env['DB_USER']
const DB_PASS = process.env['DB_PASS']
const CONNECTION_STRING = 'jdbc:postgresql://127.0.0.1:5432/kleddit-test'

/**
 * Logic of this method is very straightforward, because it's used only
 * for testing.
 * @returns {Promise<void>}
 */
export const resetDatabase = async () => {

    //1. load sql from file
    const sql = await readFile('../sql/create-database.sql')

    console.log(sql);
    //2. connect to db
    const client = new pg.Client(CONNECTION_STRING)

    //3. execute
    await client.query(sql)

    return client.end()
}