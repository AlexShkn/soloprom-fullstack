import { config } from 'dotenv';
config();

const configuration = {
  databaseUrl: process.env.DATABASE_URL,
  targetUrl: process.env.SCRAPE_TARGET_URL,
  outputFilePath: process.env.SCRAPE_OUTPUT_FILE_PATH,
  tiresTargetUrl: process.env.SCRAPE_TIRES_TARGET_URL,
  batteriesTargetUrl: process.env.SCRAPE_BATTERIES_TARGET_URL,
  batteriesStockTargetUrl: process.env.SCRAPE_BATTERIES_STOCK_TARGET_URL,
  loginUrl: process.env.SCRAPE_LOGIN_URL,
  submitSelector: process.env.SCRAPE_SUBMIT_SELECTOR,
  userlogin: process.env.SCRAPE_USERLOGIN,
  password: process.env.SCRAPE_PASSWORD,
  usernamePlaceholder: process.env.SCRAPE_USERNAME_PLACEHOLDER,
  authCheckSelector: process.env.SCRAPE_AUTH_CHECK_SELECTOR,
  tiresOutputFilePath: process.env.SCRAPE_TIRES_OUTPUT_FILE_PATH,
  batteriesOutputFilePath: process.env.SCRAPE_BATTERIES_OUTPUT_FILE_PATH,
  batteriesStockOutputFilePath:
    process.env.SCRAPE_BATTERIES_OUTPUT_STOCK_FILE_PATH,
};

export default () => configuration;
