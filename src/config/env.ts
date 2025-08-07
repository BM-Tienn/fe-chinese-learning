export const ENV = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5678',
  API_PREFIX: process.env.REACT_APP_API_PREFIX || '/api/v1',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '120000'),

  // Environment
  NODE_ENV: process.env.REACT_APP_NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.REACT_APP_NODE_ENV === 'development',
  IS_PRODUCTION: process.env.REACT_APP_NODE_ENV === 'production',

  // App Configuration
  APP_NAME: process.env.REACT_APP_NAME || 'Chinese Learning App',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
} as const;

export const API_CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  PREFIX: ENV.API_PREFIX,
  TIMEOUT: ENV.API_TIMEOUT,
  FULL_BASE_URL: `${ENV.API_BASE_URL}${ENV.API_PREFIX}`,
} as const;
