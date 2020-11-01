module.exports = {
    roots: ['<rootDir>/test'],
    testEnvironment: 'node',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testRegex: '(\\.(test|spec))\\.(ts|js)$',
    collectCoverageFrom: ['**/*.ts'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    globals: {
        'ts-jest': {
            diagnostics: {
                pathRegex: '(\\.(test|spec))\\.(ts)$',
            },
        },
    },
};
