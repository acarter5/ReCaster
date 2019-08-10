const { resolve } = require('path')

let config

try {
    config = require(resolve(__dirname, '.eslintrc.js')).rules[
        'prettier/prettier'
    ][1]
    config = Object.assign({}, config, { parser: 'babylon' })
} catch (e) {
    console.log(e)
}

module.exports = config
