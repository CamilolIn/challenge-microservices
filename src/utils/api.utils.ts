// Constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

// Utility functions
export const successResponse = <T = any>(data: T, statusCode = 200) => {
  return {
    success: true,
    statusCode,
    data,
  }
};

export const errorResponse = (description: string, error: any = null, statusCode = 500) => {
  return {
    success: false,
    statusCode,
    description,
    details: error
  }
};