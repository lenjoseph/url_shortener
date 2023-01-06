/**
 * returns the base url
 * @param url
 * @returns string
 */
export const getBaseUrl: (url: string) => string = (url: string) => {
  // assumes https://domain.com/ format
  const urlChunks = url.split("/");
  return urlChunks[0].concat("//", urlChunks[1], urlChunks[2], "/");
};
