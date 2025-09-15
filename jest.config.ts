import type { Config } from 'jest';

const config: Config = {
    roots: ['src', 'tests'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    coverageReporters: ['text', 'lcov', 'cobertura', 'html'],
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    coverageThreshold: {
        global: {
            branches: 75,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/index.ts',
        '!src/tests/**',
        '!src/**/*.types.ts',
        '!src/**/*.interfaces.ts',
        '!src/**/*.constants.ts',
        '!src/**/*.symbols.ts',
        '!src/**/*.baseSchema.ts',
        '!src/environmentList.ts',
    ],
};

export default config;
