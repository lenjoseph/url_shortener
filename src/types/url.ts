import { BaseType } from "./common";

export type UrlSet = BaseType & {
  /**
   * indexing data (lowercase, alphanumeric + hyphen, trimmed)
   * pk: id (standardized long url)
   * gsi: shortUrlHash
   */
  id: string;
  shortUrlHash: string;
  /**
   * presentation data: user-controlled values
   */
  longUrl: string;
  shortUrl: string;
};
