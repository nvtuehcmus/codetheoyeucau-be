module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['app/rest/tests'],
  modulePaths: ['app'],
  setupFilesAfterEnv: ['./app/rest/tests/bootstrap.ts'],
};
