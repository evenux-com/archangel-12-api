import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf } = winston.format;

const logsFolderPath = path.join(__dirname, '../', 'logs');

// Define a custom format with timestamp
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Specify the desired timestamp format
    customFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsFolderPath, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logsFolderPath, 'combined.log'),
    }),
  ],
});

export default logger;
