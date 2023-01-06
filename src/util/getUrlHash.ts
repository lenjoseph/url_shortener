/**
 * returns the content following the base url
 * @param url
 * @returns string
 */
export const getUrlHash: (url: string) => string = (url: string) => {
  // assumes https://domain.com/ format
  const foundHash: string | undefined = url.split("/")[3];
  return foundHash ? foundHash.toLowerCase() : undefined;
};
