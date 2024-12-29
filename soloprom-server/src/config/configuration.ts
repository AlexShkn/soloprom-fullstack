import { config } from 'dotenv';
config();

const username = process.env.USERLOGIN;
console.log('Loaded Username:', username);

const configuration = {
  databaseUrl: process.env.DATABASE_URL,
  targetUrl: process.env.TARGET_URL,
  outputFilePath: process.env.OUTPUT_FILE_PATH,
  loginUrl: process.env.LOGIN_URL,
  submitSelector: process.env.SUBMIT_SELECTOR,
  userlogin: process.env.USERLOGIN,
  password: process.env.PASSWORD,
  usernamePlaceholder: process.env.USERNAME_PLACEHOLDER,
  authCheckSelector: process.env.AUTH_CHECK_SELECTOR,
};
console.log('Loaded Config:', configuration);

export default () => configuration;
