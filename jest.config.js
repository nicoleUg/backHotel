/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['**/src/test/**/*.spec.ts'],
  // Solo mide cobertura sobre la lógica de negocio (services y patterns)
  collectCoverageFrom: [
    'src/services/**/*.ts',
    'src/patterns/**/*.ts',
    'src/utils/**/*.ts',
    '!src/**/*.module.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.entity.ts',
    '!src/main.ts',
  ],
coverageDirectory: 'reports/reporte-cobertura-hotel',
  coverageReporters: ['lcov', 'html', 'text'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
