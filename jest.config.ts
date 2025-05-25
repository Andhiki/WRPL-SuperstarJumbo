import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],
  
  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': 'jest-transform-stub',
  },
  
  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.(test|spec).[jt]s?(x)',
    '**/*.(test|spec).[jt]s?(x)'
  ],
  
  // A map from regular expressions to paths to transformers
  transform: {
     '^.+\\.(t|j)sx?$': ['babel-jest', {
      presets: [
        ['next/babel', { 'preset-react': { runtime: 'automatic' } }]
      ],
    }],
  },
  
  // Transform node_modules that use ES modules
  transformIgnorePatterns: [
    'node_modules/(?!(payload|@payloadcms)/)',
  ],
  
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // The glob patterns Jest uses to detect test files
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },

  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,ts}',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],

  // Setup files to run before each test (optional)
  // setupFiles: ['<rootDir>/jest.polyfills.js'],

  // Error handling
  errorOnDeprecated: true,
  
  // Module resolution
  resolver: undefined,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)