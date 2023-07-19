require('dotenv').config();
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_SERVER || 'http://localhost:9000',
    token: process.env.SONAR_TOKEN || '',
    options: {},
  },
  () => {
    console.log('Sonar scanner for quality analysis', serverUrl);
    process.exit();
  },
);
