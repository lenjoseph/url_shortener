import {
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { buildErrorResponse, HTTPStatusCodes } from "../http";
import { DynamoDB, Table } from "../services/dynamo";
import { CreateUrlSet, UrlRequest, UrlSet } from "../types";
import {
  createUrlHash,
  createUrlKey,
  getBaseUrl,
  getUrlHash,
  isoNow,
} from "../util";
import { checkValidUrl } from "../validation";

export const UrlController = {
  get: async ({ url }: UrlRequest) => {
    if (!checkValidUrl(url)) {
      throw buildErrorResponse("Invalid url", HTTPStatusCodes.BAD_REQUEST);
    }
    // convert request value to key format
    const urlKey: string = createUrlKey(url);
    // check if this URL exist as PK (is this existing long-form?)
    const GetParams: GetCommandInput = {
      TableName: Table.UrlsTable,
      Key: { id: urlKey },
    };
    const { Item } = (await DynamoDB.send(new GetCommand(GetParams))) as Omit<
      GetCommandOutput,
      "Item"
    > & { Item: UrlSet };
    // if record long-form record found, return the short-form
    if (Item) {
      return Item.shortUrl;
    }
    // if not found, check if this URL hash exists as global secondary index (is this existing short-form?)
    const shortUrlHash: string = getUrlHash(url);
    if (shortUrlHash) {
      const QueryParams: QueryCommandInput = {
        TableName: Table.UrlsTable,
        IndexName: "shortUrlHash-index",
        KeyConditionExpression: "#shortUrlHash = :shortUrlHash",
        ExpressionAttributeNames: {
          "#shortUrlHash": "shortUrlHash",
        },
        ExpressionAttributeValues: {
          ":shortUrlHash": shortUrlHash,
        },
      };
      const { Items } = (await DynamoDB.send(
        new QueryCommand(QueryParams)
      )) as Omit<QueryCommandOutput, "Items"> & { Items: UrlSet[] };
      // if items were found, return the long-form url for the first record
      // we assume there is only one record here, because the system would never create duplicates as coded
      if (Items && Items.length > 0) {
        return Items[0].longUrl;
      }
    }
    // if the provided url did not exist as a long or short-form url, we create a new record, treating it as a long-form
    const newShortUrl: string = await UrlController.create({
      url: url,
      urlKey,
    });
    return newShortUrl;
  },
  create: async ({ url, urlKey }: CreateUrlSet) => {
    const newUrlHash = createUrlHash();
    const newUrlSet: UrlSet = {
      id: urlKey,
      shortUrlHash: newUrlHash,
      shortUrl: getBaseUrl(url).concat(newUrlHash),
      longUrl: url,
      createdAt: isoNow(),
    };
    const PutParams: PutCommandInput = {
      TableName: Table.UrlsTable,
      Item: newUrlSet,
    };
    await DynamoDB.send(new PutCommand(PutParams));
    return newUrlSet.shortUrl;
  },
};
