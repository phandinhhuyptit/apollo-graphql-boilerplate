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
  PORT: process.env.BLOG_BACKEND_PORT,
  MONGO_URL: process.env.BLOG_MONGO_URL,

  // Eviroment
  IS_PROD: process.env.NODE_ENV === "production"
};
