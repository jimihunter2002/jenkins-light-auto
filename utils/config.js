require('dotenv').config();

const JENKINS_TEST = process.env.JENKINS_TEST;
const COMMENT = process.env.COMMENT;
console.log(process.env.SONAR_TOKEN);

module.exports = {
  JENKINS_TEST,
  COMMENT,
};
