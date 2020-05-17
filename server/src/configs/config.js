import dotenv from "dotenv";

dotenv.config();

//get config from environment
export default {
  // Apollo Server
  PORT: process.env.PORT,
  APOLLO_PLAYGROUND: process.env.APOLLO_PLAYGROUND,
  APOLLO_INTROSPECTION: process.env.APOLLO_INTROSPECTION,
  APOLLO_DEBUG: process.env.APOLLO_DEBUG,
  APOLLO_PATH: process.env.APOLLO_PATH,

  // # Server Security
  SERVER_CORS_ENABLED: process.env.SERVER_CORS_ENABLED,
  SERVER_REQUEST_WHITE_LIST: process.env.SERVER_REQUEST_WHITE_LIST,

  // Enviroment
  IS_PROD: process.env.NODE_ENV === "production",

  // MongoDB
  MONGO_URL: process.env.MONGO_URL,

  // Redis
  REDIS_DEFAULT_HOST: process.env.REDIS_DEFAULT_HOST,
  REDIS_DEFAULT_PORT: process.env.REDIS_DEFAULT_PORT,
  REDIS_DEFAULT_DB_NAME: process.env.REDIS_DEFAULT_DB_NAME,
};
