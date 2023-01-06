export enum HTTPStatusCodes {
  SUCCESSFUL_GET = 200,
  SUCCESSFUL_POST_OR_PUT = 201,
  SUCCESSFUL_UPDATE = 201,
  SUCCESSFUL_DELETE = 204,
  BAD_REQUEST = 400,
}

export enum HTTPSuccessResponseMessages {
  SUCCESSFUL_POST = "successfully created",
  SUCCESSFUL_GET = "successfully retrieved",
  SUCCESSFUL_PUT = "successfully updated",
  SUCCESSFUL_DELETE = "successfully deleted",
}

export const HTTPResponseHeader = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Accept,Accept-Language,Content-Language,Content-Type,authorization,x-api-key",
  "Access-Control-Allow-Origin": "*",
};
