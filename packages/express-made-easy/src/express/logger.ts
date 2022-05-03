import winston from "winston";
import morgan, { StreamOptions } from "morgan";

export const winstonLogger = (logDir: string) => {
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
  };

  const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };
  winston.addColors(colors);

  const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} -- ${info.level}: ${info.message}`
    )
  );

  const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: `${logDir}all.log` }),
  ];

  return winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
  });
};

export const morganMiddleware = (logDir: string) => {
  // path last slash if not exists
  if (!logDir.endsWith("/")) {
    logDir += "/";
  }

  const stream: StreamOptions = {
    write: (message) => winstonLogger(logDir).http(message),
  };

  const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
  };
  return morgan(
    ":remote-addr -- :url -- :method --  :status -- :res[content-length] -- :response-time ms ",
    {
      stream,
      skip,
    }
  );
};
