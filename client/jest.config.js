module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    'client/src/react-app-env.d.ts',
  ],
  roots: [
    'src',
  ],
  "moduleNameMapper": { "\\.(css|less)$": "<rootDir>/testUtils/cssStub.js" },
};
