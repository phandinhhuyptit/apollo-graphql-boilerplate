require("dotenv").config();
import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import logger from "./utils/logger";
import configs from "./configs/config";
import typeDefs from "./graphql/schema/schema";
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers/resolvers";

import { ApolloServer, gql } from "apollo-server-express";

const PORT = parseInt(configs.PORT, 10) || 9005;
const playground = (configs.APOLLO_PLAYGROUND === "true" && true) || false;
const introspection =
  (configs.APOLLO_INTROSPECTION === "true" && true) || false;
const debug = (configs.APOLLO_DEBUG === "true" && true) || false;

const whitelist = configs.SERVER_REQUEST_WHITE_LIST;
const corsEnabled = configs.SERVER_CORS_ENABLED;
const path = configs.APOLLO_PATH || "/graphql";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection,
  playground,
  debug
});

let app = express();

// Connect MongoDB
mongoose.connect(configs.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("open", () => {
  logger.info("DB connected");
});
db.on("error", err => logger.error(err));

// Security cors
let corsOptions = {
  origin: function(origin, callback) {
    console.log("whitelist: ", whitelist);
    if (!origin) console.log("origin: ", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed access!"));
    }
  }
};

if (corsEnabled !== "true") {
  corsOptions = {};
}

app.use(cors());

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({ message: "Not allowed access!" });
});

server.applyMiddleware({ app, path, cors: false });

// The `listen` method launches a web server.
app.listen(PORT, () => {
  logger.info(`🚀  Server ready at ${PORT}`);
});

// keep server running
process.on("uncaughtException", err =>
  logger.error("uncaughtException: " + err)
);
process.on("unhandledRejection", err =>
  logger.error("unhandledRejection: " + err)
);
