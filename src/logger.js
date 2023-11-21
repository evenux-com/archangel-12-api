const winston = require("winston");
const path = require("path");
const { combine, timestamp, printf } = winston.format;

const logsFolderPath = path.join(__dirname, "../", "logs");

// Define a custom format with timestamp
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Specify the desired timestamp format
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsFolderPath, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logsFolderPath, "combined.log"),
    }),
  ],
});

module.exports = logger;
