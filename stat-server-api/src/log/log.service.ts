import { Injectable, LoggerService } from '@nestjs/common';
import * as morgan from 'morgan';
import * as winston from 'winston';

import {
  consoleTransport,
  errorFileTransport,
  logFileTransport,   
} from '@log/log.constants'

const logger = winston.createLogger({
    defaultMeta: {
        service: 'stat-server',
    },
    level: 'debug', //process.env.LOG_LEVEL || 'info',
    levels: winston.config.syslog.levels,
    transports: [
        consoleTransport,
        logFileTransport,
        errorFileTransport,
    ],
    exceptionHandlers: [
        new winston.transports.File({ 
          dirname: 'logs', 
          filename: 'exception.log' 
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ 
          dirname: 'logs', 
          filename: 'rejections.log' 
        }),
    ],
});

// Create a Morgan stream for Winston
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Configure MorganMiddleware with the stream
export const MorganMiddleware = morgan(':method :url :status :res[content-length] :remote-addr - :response-time ms', { stream });

const profiler = logger.startTimer();

setTimeout(() => {
  // End the timer and log the duration
  profiler.done({ message: 'Timer completed' });
}, 1000);

@Injectable()
export class LogService implements LoggerService {
  debug(message: string, context: string) {
    logger.debug(message, { context });
  }
  log(message: string, context: string) {
    logger.info(message, { context } );
  }
  notice(message: string, context: string) {
    logger.notice(message, { context });
  }
  warn(message: string, context: string) {
    logger.warning(message, { context });
  }
  error(message: string, trace: string, context: string) {
    logger.error(message, { trace, context });
  }
  crit(message: string, context: string) {
    logger.crit(message, { context });
  }
  emerg(message: string, context: string) {
    logger.emerg(message, { context });
  }
}