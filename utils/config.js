require('dotenv').config();

console.log(process.env.SONAR_TOKEN);
const JENKINS_TEST = process.env.JENKINS_TEST;
const COMMENT = process.env.COMMENT;

module.exports = {
  JENKINS_TEST,
  COMMENT,
};
