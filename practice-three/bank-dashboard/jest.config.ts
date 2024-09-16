import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The root directory that Jest should scan for tests and modules within
  rootDir: 'src',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['../jest.setup.ts'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
    '.+\\.(png|jpg)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
  },

  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/**/constants/*',
    '<rootDir>/**/icons/*',
    '<rootDir>/**/interfaces/*',
    '<rootDir>/**/mocks/*',
    '<rootDir>/**/routes/*',
    '<rootDir>/**/themes/*',
    '<rootDir>/**/types/*',
    '<rootDir>/main.tsx',
    '<rootDir>/vite-env.d.ts',
    '^.*\\.stories\\.[jt]sx?$',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: '../coverage',

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
