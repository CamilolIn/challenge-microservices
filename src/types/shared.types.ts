import { NextFunction, Request, Response } from "express";

export interface IAsyncRequestHandler<T = void> {    
  (
    req: Request,
    res: Response,
    next?: NextFunction,
  ): Promise<T>;
};