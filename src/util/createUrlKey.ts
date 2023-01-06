/**
 * convert long url to primary key
 * @param url
 * @returns string
 */
export const createUrlKey: (url: string) => string = (url: string) => {
  // strip all but alphanumeric and hyphen
  // trim spaces
  // convert to lowercase
  return url
    .replace(/[^A-Za-z0-9-\s]/g, "")
    .trim()
    .toLowerCase();
};
