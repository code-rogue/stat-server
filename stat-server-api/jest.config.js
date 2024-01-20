module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@auth/(.*)$": "<rootDir>/src/auth/$1",
        "^@migrations/(.*)$": "<rootDir>/src/migrations/$1",
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@test/(.*)$": "<rootDir>/test/$1",
        "^@users/(.*)$": "<rootDir>/src/users/$1"
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
        "/src/migrations/",
        "/src/database.ts",
        "/src/migrate.js",
        "/src/umzug.ts",
        "/jest.config.js",
        "/.eslintrc.js",
    ]
  };