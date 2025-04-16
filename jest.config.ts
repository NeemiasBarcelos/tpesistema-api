import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/test/e2e/'], // <--- ignora e2e aqui
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config