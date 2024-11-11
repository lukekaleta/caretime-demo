module.exports = {
    locales: ['cs', 'en', 'sk'],
    catalogs: [
        {
            path: '<rootDir>/src/locales/{locale}/messages',
            include: [
                '<rootDir>/src/components/**',
                '<rootDir>/src/lib/**',
                '<rootDir>/src/locales/**',
                '<rootDir>/src/pages/**',
                '<rootDir>/src/providers/**',
                '<rootDir>/src/services/**',
                '<rootDir>/src/utils/**',
            ],
            exclude: ['**/node_modules/**'],
        },
    ],
    format: 'po',
}
