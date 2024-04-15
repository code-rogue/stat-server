module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@auth/(.*)$": "<rootDir>/src/auth/$1",
        "^@config/(.*)$": "<rootDir>/src/config/$1",
        "^@constants/(.*)$": "<rootDir>/src/constants/$1",
        "^@database/(.*)$": "<rootDir>/src/database/$1",
        "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
        "^@log/(.*)$": "<rootDir>/src/log/$1",
        "^@migrations/(.*)$": "<rootDir>/src/migrations/$1",
        "^@player/(.*)$": "<rootDir>/src/player/$1",
        "^@team/(.*)$": "<rootDir>/src/team/$1",
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@test/(.*)$": "<rootDir>/test/$1",
        "^@user/(.*)$": "<rootDir>/src/user/$1"
    },
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "rootDir": "./",
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "/dist/",
        "/test/",
        "/src/log/",
        "/src/migrations/",
        "/src/sequelize.ts",
        "/src/main.ts",
        "/src/migrate.js",
        "/src/umzug.ts",
        "/jest.config.js",
        "/.eslintrc.js",
        '/src/.*\\.module\\.[jt]s$',
        '/src/.*\\.dto\\.[jt]s$',
    ]
  };