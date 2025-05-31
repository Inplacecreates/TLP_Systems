/** @type {import('jest').Config} */
export default {
  // Test environment
  testEnvironment: 'node',

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Coverage exclusions
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/prisma/migrations/',
  ],

  // Files to collect coverage from
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!**/prisma/migrations/**',
  ],

  // Test patterns
  testMatch: [
    '**/test/**/*.test.js',
    '**/test/**/*.spec.js'
  ],

  // Module resolution
  moduleDirectories: ['node_modules'],

  // Clear mocks
  clearMocks: true,

  // Setup files
  setupFilesAfterEnv: ['./test/setup.js'],

  // Test timeout
  testTimeout: 30000,

  // Verbose output
  verbose: true
};