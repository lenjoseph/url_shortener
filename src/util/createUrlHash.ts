import randomHash from "crypto-random-string";
/**
 * generates random string hash of length 12
 * @returns string
 */
export const createUrlHash: () => string = () => {
  return randomHash({ length: 12, type: "url-safe" }).toLowerCase();
};
