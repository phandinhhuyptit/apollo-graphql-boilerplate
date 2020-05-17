require("dotenv").config();
import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import configs from "../configs/config"
 
const options = {
  host: configs.REDIS_DEFAULT_HOST,
  port: configs.REDIS_DEFAULT_PORT,
  db: configs.REDIS_DEFAULT_DB_NAME,
  retry_strategy: options => {
    return Math.max(options.attempt * 100, 3000);
  }
};

export default new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
