import {Pool} from 'pg'

//todo abstract this to automatically close

const DB_USER = process.env['KLEDDIT_DB_USER']
const DB_PASS = process.env['KLEDDIT_DB_PASS']
const HOST = '127.0.0.1'
const DB  = 'kleddit-test' //TODO later load from config

const pool = new Pool({
    user: DB_USER,
    password: DB_PASS,
    host: HOST,
    port: 5432,
    database: DB,
})

export default pool