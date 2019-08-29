const mysql = require('mysql')

const DATABASE = process.env.NODE_ENV === 'test' ? 'recaster_test' : 'recaster'

let dbPool

const createPool = () => {
    dbPool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'ACisdude5',
        database: DATABASE,
        multipleStatements: process.env.NODE_ENV === 'test',
        charset: 'utf8mb4'
    })

    return dbPool
}

const getConnection = cb => {
    dbPool.getConnection((err, connection) => {
        cb(err, connection)
    })
}

if (process.env.NODE_ENV !== 'test') {
    createPool()
}

module.exports = { getConnection, dbPool, createPool }
