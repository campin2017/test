module.exports = {
  cacheDirectory: __dirname + '/.jest_cache',
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testRegex: '(.*.(test|spec)).(tsx?|ts?)$',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/*.graphql',
    '!**/coverage/**'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 90,
      functions: 0,
      lines: 0
    }
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-TEST.xml'
      }
    ]
  ],
  coveragePathIgnorePatterns: [
    '.*test\\.data\\.ts$,migrations.*.ts$,(.*.(test|spec)).(tsx?)$,(tests/.*.mock).(tsx?)$'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  verbose: true
}
