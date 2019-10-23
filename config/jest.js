module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/lib/(styles|mocks)/**',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/config/tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  preset: 'ts-jest',
  rootDir: '../',
  testEnvironment: 'jest-environment-jsdom-global',
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
}
