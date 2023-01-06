export type HTTPResponse = {
  statusCode: number;
  headers: Record<string, string | boolean>;
  body: string;
};
