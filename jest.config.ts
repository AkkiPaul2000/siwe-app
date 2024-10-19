import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      useESM: true,
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handle CSS/SCSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/__tests__/helpers/'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      useESM: true,
    }
  },
  rootDir: '.',
  moduleDirectories: ['node_modules', 'src'],
  verbose: true,
  testTimeout: 10000,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};

export default config;
