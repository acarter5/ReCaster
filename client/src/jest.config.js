module.exports = {
    displayName: 'client',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        require.resolve('./test-utils/setup-test-framework.js')
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            './__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy'
        // '\\.(css|less)$': './__mocks__/styleMock.js'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@testing-library|indent-string)/)'
    ]
}
