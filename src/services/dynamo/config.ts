import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const tablePrefix = process.env.DYNAMO_TABLE_PREFIX;

export const Table = {
  UrlsTable: `${tablePrefix}_Urls`,
};

const config = { region: "us-east-1" };

export const DynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient(config));
