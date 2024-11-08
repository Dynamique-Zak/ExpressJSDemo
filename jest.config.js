module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'], // Génère un rapport lcov pour SonarQube
  collectCoverageFrom: ['src/**/*service.js'], // Cibler uniquement les fichiers de service pour la couverture
  reporters: [
    'default',
   'jest-sonar',
  ],
};
