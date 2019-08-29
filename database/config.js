const mysql = require('mysql')

const DATABASE = process.env.NODE_ENV === 'test' ? 'recaster_test' : 'recaster'

const dbPool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'circle_test',
    database: DATABASE,
    multipleStatements: process.env.NODE_ENV === 'test',
    charset: 'utf8mb4'
})

const getConnection = cb => {
    dbPool.getConnection((err, connection) => {
        cb(err, connection)
    })
}

module.exports = getConnection
