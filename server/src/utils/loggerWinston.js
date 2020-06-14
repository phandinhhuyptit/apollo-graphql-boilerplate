import moment from "moment";
import { createLogger, transports, format } from "winston";
require("winston-daily-rotate-file");
​
const customFormat = format.printf(
  ({ timestamp, level, message }) => `[${timestamp}] {${level}:${message}}`
);
const timestampWithTimezone = format(info => {
  info.timestamp = moment().format("YYYYMMDD-HH:mm:ss:SSS");
  return info;
});
​
const options = {
  exitOnError: false, // do not exit on handled exceptions
  level: "info",
  format: format.combine(timestampWithTimezone(), format.json(), customFormat),
  transports: [
    new transports.DailyRotateFile({
      name: "info",
      datePattern: "YYYYMMDD",
      zippedArchive: true,
      maxFiles: "1d",
      maxSize: "10m",
      showLevel: true,
      timestamp: true,
      level: "info", // info and below to rotate
      filename: `${process.cwd()}/logs/%DATE%-info.log`
    }),
    new transports.DailyRotateFile({
      name: "error",
      datePattern: "YYYYMMDD",
      zippedArchive: true,
      maxFiles: "1d",
      maxSize: "10m",
      showLevel: true,
      timestamp: true,
      level: "error", // error and below to rotate
      filename: `${process.cwd()}/logs/%DATE%-error.log`
    })
  ]
  // exceptionHandlers: [
  //   new transports.File({ filename: `${process.cwd()}/logs/exceptions.log` })
  // ]
};
let logger = createLogger(options);
​
if (process.env.NODE_ENV !== "test") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        timestampWithTimezone(),
        format.simple(),
        customFormat
      )
    })
  );
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};
​
export default logger;