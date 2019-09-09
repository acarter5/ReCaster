const mysql = require('promise-mysql')

const DATABASE = process.env.NODE_ENV === 'test' ? 'recaster_test' : 'recaster'
const DB_HOST =
    process.env.NODE_ENV === 'production' ? 'recaster_db' : 'localhost'

let dbPoolPromise

const createPool = async () => {
    console.log('in create pool')
    try {
        dbPoolPromise = await mysql.createPool({
            connectionLimit: 100,
            host: DB_HOST,
            user: 'root',
            password: 'mysqlpwd',
            database: DATABASE,
            multipleStatements: process.env.NODE_ENV === 'test',
            charset: 'utf8mb4'
        })
    } catch (err) {
        console.log('err create pool', err)
    }

    console.log('pool', dbPoolPromise)

    return dbPoolPromise
}

const getConnection = async () => {
    console.log('in get connection')
    const dbPool = await dbPoolPromise
    let connection
    try {
        connection = await dbPool.getConnection()
    } catch (err) {
        console.log('err get connection', err)
    }

    console.log('connection', connection)

    return connection
}

if (process.env.NODE_ENV !== 'test') {
    console.log('pool initiated')
    createPool()
}

module.exports = { getConnection, createPool, dbPoolPromise }
