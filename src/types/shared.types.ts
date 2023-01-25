import { NextFunction, Request, Response } from "express";


// Location
type TLocation = [number, number];

export interface ILocationDB  {
  type: "Point"  | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon";
  coordinates: TLocation | TLocation[] | TLocation[][]
};

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IAsyncRequestHandler<T = void> {    
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<T>;
}

export interface ISuccessResponse<T = any> {
  success: boolean;
  data: T,
  statusCode: number;
}

export interface IErrorResponse<T = any> {
  success: boolean;
  statusCode: number;
  description: string;
  details: T;
}