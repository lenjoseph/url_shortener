/**
 *
 * @param inputSchema
 * @returns standardied schema metadata for APIGateWay request validation
 */
export const getInputSchema: (inputSchema: Record<string, any>) => {
  type: string;
  required: string[];
  properties: {
    body: Record<string, any>;
  };
} = (inputSchema: Record<string, any>) => {
  return {
    type: "object",
    required: ["body"],
    properties: { body: inputSchema },
  };
};
