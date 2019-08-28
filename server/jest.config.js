module.exports = {
    displayName: 'server',
    testEnvironment: 'node',
    setupFilesAfterEnv: [
        require.resolve('./test-utils/setup-test-framework.js')
    ]
}
