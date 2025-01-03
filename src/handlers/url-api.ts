import Schema from "../../schema.json";
import { UrlController } from "../controllers";
import {
  buildErrorResponse,
  buildSuccessResponse,
  HTTPStatusCodes,
  HTTPSuccessResponseMessages,
} from "../http";
import { middyfy } from "../middleware";

const getUrl = async (event) => {
  try {
    if (!event?.body?.url) {
      return buildErrorResponse(
        "Invalid request: missing url request parameter",
        HTTPStatusCodes.BAD_REQUEST
      );
    }
    const responseData = await UrlController.get({
      url: event.body.url,
    });
    return buildSuccessResponse(
      responseData,
      HTTPSuccessResponseMessages.SUCCESSFUL_GET,
      HTTPStatusCodes.SUCCESSFUL_GET
    );
  } catch (error) {
    return error;
  }
};

export const middyGetUrl = middyfy({
  handler: getUrl,
  inputSchema: Schema.definitions.UrlRequest,
});
