import { IAsyncRequestHandler } from "../types/shared.types";

export class HTTP_ERROR {
  constructor(
    public statusCode: number,
    public description: string,
    public details?: any,
  ) {}
};

/**
 * This function will acts as a decorator for controllers class methods. It will wrap an 
 * specific endpoint's handler into a try/catch statement and handle Both success and 
 * failure cases.
 * @returns new wrapped handler definition.
 */
export const errorWrapper = () => {
  return (
    _target: Object,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<IAsyncRequestHandler<any>>
  ) => {
    // First we have to store current request handler definition to execute it later.
    const requestHandler = descriptor.value;

    // Now we have to change handler definition to wrap it in a try/catch statement.
    descriptor.value = async (req, res, next) => {
      try {
        // Returning original handler execution if everything is successful.
        return await requestHandler!(req, res, next);
      }
      catch (error) {
        // Redirecting error to error.middleware.ts if something fails during the request.
        next(error);
      }
    }
    // Finally, we have to return new handler's definition.
    // to match with decorator pattern.
    return descriptor;
  }
  };