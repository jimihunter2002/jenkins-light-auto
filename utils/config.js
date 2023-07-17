require('dotenv').config();

const JENKINS_TEST = process.env.JENKINS_TEST;
const COMMENT = process.env.COMMENT;
console.log('TEST');

module.exports = {
  JENKINS_TEST,
  COMMENT,
};
