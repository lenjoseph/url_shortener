import dayjs from "dayjs";
/**
 *
 * @returns current time as an ISO 8601 string.
 */
export const isoNow: () => string = () => {
  return dayjs().toISOString();
};
