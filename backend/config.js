require('dotenv').config();

const {
  PORT = '3000',
  MONGO_URI = 'mongodb://127.0.0.1:27017/buildateam_db',
  STORE_NAME = 'cpb-new-developer.myshopify.com',
  STORE_TOKEN = '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',
} = process.env;

// const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PRODUCTION : 'dev-secret';

module.exports = {
  PORT,
  MONGO_URI,
  STORE_NAME,
  STORE_TOKEN
};
