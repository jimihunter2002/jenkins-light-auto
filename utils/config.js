require('dotenv').config();

const JENKINS_TEST = process.env.JENKINS_TEST;
const COMMENT = process.env.COMMENT;

module.exports = {
  JENKINS_TEST,
  COMMENT,
};
