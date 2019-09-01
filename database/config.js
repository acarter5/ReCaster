const mysql = require('promise-mysql')

const DATABASE = process.env.NODE_ENV === 'test' ? 'recaster_test' : 'recaster'

let dbPoolPromise

const createPool = async () => {
    dbPoolPromise = await mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'mysqlpswd',
        database: DATABASE,
        multipleStatements: process.env.NODE_ENV === 'test',
        charset: 'utf8mb4'
    })

    return dbPoolPromise
}

// console.log('get connection', dbPool.getConnection)

const getConnection = async () => {
    const dbPool = await dbPoolPromise
    const connection = await dbPool.getConnection()
    return connection
}

// const getConnection = cb => {
//     dbPool.getConnection((err, connection) => {
//         cb(err, connection)
//     })
// }

if (process.env.NODE_ENV !== 'test') {
    createPool()
}

module.exports = { getConnection, createPool, dbPoolPromise }
