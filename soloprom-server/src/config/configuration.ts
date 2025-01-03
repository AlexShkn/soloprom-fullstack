import { config } from 'dotenv';
config();

const configuration = {
  databaseUrl: process.env.DATABASE_URL,
  targetUrl: process.env.TARGET_URL,
  outputFilePath: process.env.OUTPUT_FILE_PATH,
  tiresTargetUrl: process.env.TIRES_TARGET_URL,
  batteriesTargetUrl: process.env.BATTERIES_TARGET_URL,
  loginUrl: process.env.LOGIN_URL,
  submitSelector: process.env.SUBMIT_SELECTOR,
  userlogin: process.env.USERLOGIN,
  password: process.env.PASSWORD,
  usernamePlaceholder: process.env.USERNAME_PLACEHOLDER,
  authCheckSelector: process.env.AUTH_CHECK_SELECTOR,
  tiresOutputFilePath: process.env.TIRES_OUTPUT_FILE_PATH,
  batteriesOutputFilePath: process.env.BATTERIES_OUTPUT_FILE_PATH,
};

export default () => configuration;
