import { ErrorRequestHandler } from 'express';
import { errorResponse } from '../utils/api.utils';

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  const errorCode = error.statusCode || 500;
  const errorMessage = error.description || error.message || "There was an unexpected error";
  const errorDetails = error.description ? error.details || null : error;
  return res.status(errorCode).json(errorResponse(errorMessage, errorDetails));
};