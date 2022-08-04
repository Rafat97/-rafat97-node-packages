import winston from "winston";

/**
 *
 * IWinstonLoggerOptions is all the supported options for custom WinstonLogger
 *
 *
 * @param  {string | undefined | ""} appName  name of the application
 * @param  {Object} levels  winston levels https://github.com/winstonjs/winston#logging-levels
 * @param  {Object} colors  winston color https://github.com/winstonjs/winston#using-custom-logging-levels
 * @param  {winston.Logger | null | undefined} customWinstonInstance  custom made winston instance
 * @param  {array} addTransport  add your own transport
 * @param  {object} addDefaultMeta  add your own metadata
 * @param  {winston.Logform.Format} addFormats  add your own formats
 * @param  {boolean} isEnablePrintRestOfTheObject  show all the outputs except message, levels
 *
 */
export interface IWinstonLoggerOptions {
  appName: string | undefined | "";
  levels?: {};
  colors?: {};
  customWinstonInstance?: winston.Logger | null | undefined;
  addTransport?: [];
  addDefaultMeta?: {};
  addFormats?: winston.Logform.Format;
  isEnablePrintRestOfTheObject?: boolean;
}

export class WinstonLogger {
  private options: IWinstonLoggerOptions;
  constructor(options: IWinstonLoggerOptions) {
    this.options = options;
  }

  loggerInit = () => {
    const config = {
      levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7,
        trace: 8,
        input: 9,
        prompt: 10,
        help: 11,
        critical: 12,
        ...this.options.levels,
      },
      colors: {
        error: "red",
        debug: "blue",
        warn: "yellow",
        data: "grey",
        info: "green",
        verbose: "cyan",
        silly: "magenta",
        custom: "yellow",
        trace: "magenta",
        input: "grey",
        prompt: "grey",
        help: "cyan",
        critical: "yellow",
        ...this.options.colors,
      },
    };

    function rest(info: any) {
      return JSON.stringify(
        Object.assign({}, info, {
          level: undefined,
          message: undefined,
          // splat: undefined,
          // label: undefined,
        }),
        null,
        2
      );
    }

    const winstonOptions: winston.LoggerOptions = {
      levels: config.levels,
      defaultMeta: {
        service: this.options.appName,
        hostName: process.env.HOSTNAME || "unknown",
        environment: process.env.NODE_ENV || "NONE",
      },
      format: winston.format.combine(
        // winston.format.json(),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info) => {
          return `${info.timestamp} [${info.level}]: ${info.message} ${
            this.options.isEnablePrintRestOfTheObject ? `\n${rest(info)}` : ""
          }`;
        })
      ),
      transports: [new winston.transports.Console({ handleExceptions: true })],
    };

    if (this.options.addDefaultMeta) {
      winstonOptions.defaultMeta = this.options.addDefaultMeta;
    }
    if (this.options.addFormats) {
      winstonOptions.format = this.options.addFormats;
    }

    let logger = winston.createLogger(winstonOptions);
    if (this.options.customWinstonInstance) {
      logger = this.options.customWinstonInstance;
    }

    return logger;
  };

  overrideConsoleLogger = () => {
    const logger = this.loggerInit();

    console.log = (...args) => logger.info(...args);
    console.info = (...args) => logger.info(...args);
    console.warn = (...args) => logger.warn(...args);
    console.error = (...args) => logger.error(...args);
    console.debug = (...args) => logger.debug(...args);

    return logger;
  };
}
