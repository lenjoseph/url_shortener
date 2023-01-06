import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { getInputSchema } from "../util";

export const middyfy = ({
  handler,
  inputSchema,
}: {
  handler: any;
  inputSchema?: Record<string, any>;
}) => {
  const middleWares: any[] = [jsonBodyParser()];
  if (inputSchema) {
    middleWares.push(
      validator({
        inputSchema: getInputSchema(inputSchema),
      })
    );
  }
  const handle = middy(handler).use(middleWares);
  return handle;
};
