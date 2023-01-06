/**
 * request interface that allows a vague url
 * controller will determine if this is a short or long
 * form url
 */
export interface UrlRequest {
  url: string;
}

export interface CreateUrlSet {
  url: string;
  urlKey: string;
}
