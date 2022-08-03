import express, { Request, Response, NextFunction } from "express";

export const metricHttpCounter = (app: express.Application, meter: any) => {
  const httpCounter = meter.createCounter("http_calls");
  app.use((request: Request, response: Response, next: NextFunction) => {
    console.log("httpCounter calling");
    httpCounter.add(1);
    console.log(httpCounter);
    next();
  });
};
