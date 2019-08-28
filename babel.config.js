module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        targets: {
                            node: 'current'
                        }
                    }
                ],
                // "es2015",
                // "stage-0",
                '@babel/preset-react'
            ],
            plugins: [
                'syntax-dynamic-import',
                'transform-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                'dynamic-import-node'
            ]
        },
        development: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false
                    }
                ],
                '@babel/preset-react'
            ]
        }
    }
}
