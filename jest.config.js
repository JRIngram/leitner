module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'client/**/*.{ts,tsx}',
    'server/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    'client/src/react-app-env.d.ts',
  ],
  roots: [
    'server',
    'client',
  ],
};
