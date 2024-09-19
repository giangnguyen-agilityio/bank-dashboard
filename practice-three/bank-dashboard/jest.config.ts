import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./jest.setup.ts'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],

  // The test environment that will be used for testing
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|png|jpg|ttf|woff|woff2|webp)$': 'jest-transform-stub',
  },

  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '\\.(css|scss|svg)$': 'identity-obj-proxy',
  },

  collectCoverageFrom: ['**/*.{ts,tsx}'],

  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/constants/*',
    '<rootDir>/src/assets/*',
    '<rootDir>/src/interfaces/*',
    '<rootDir>/src/mocks/*',
    '<rootDir>/src/routes/*',
    '<rootDir>/src/themes/*',
    '<rootDir>/src/types/*',
    '<rootDir>/main.tsx',
    '<rootDir>/vite-env.d.ts',
    '<rootDir>/.storybook/*',
    '<rootDir>/jest.config.ts',
    '<rootDir>/tailwind.config.ts',
    '<rootDir>/vite.config.ts',
    '^.*\\.stories\\.[jt]sx?$',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  passWithNoTests: true,
};

export default config;
