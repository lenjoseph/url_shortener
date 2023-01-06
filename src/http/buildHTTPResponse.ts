import { HTTPResponse } from "../types";
import {
  HTTPResponseHeader,
  HTTPStatusCodes,
  HTTPSuccessResponseMessages,
} from "./constants";

export const buildSuccessResponse: (
  data: any,
  message: HTTPSuccessResponseMessages,
  code: HTTPStatusCodes
) => HTTPResponse = (
  data: any,
  message: HTTPSuccessResponseMessages,
  code: HTTPStatusCodes
) => {
  return {
    body: JSON.stringify({
      message: message,
      data: data,
    }),
    statusCode: code,
    headers: HTTPResponseHeader,
  };
};

export const buildErrorResponse: (
  message: string,
  code: HTTPStatusCodes,
  error?: any
) => HTTPResponse = (message: string, code: HTTPStatusCodes, error?: any) => {
  const responseBody = { message };
  if (error) {
    Object.assign(responseBody, {
      errorMsg: error.message || undefined,
      errorStack: error.stack || undefined,
    });
  }
  return {
    body: JSON.stringify(responseBody),
    statusCode: code,
    headers: HTTPResponseHeader,
  };
};
