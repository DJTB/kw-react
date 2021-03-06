import { format } from 'date-fns';
import { DATE_TIME_FORMAT } from 'common/constants';

/**
 * Formats a Date() object to a human readable string
 * @param  {Date} date js Date()
 * @return {String} date in words
 * @example
 * format(new Date(2014, 6, 2), DATE_TIME_FORMAT)
 * // => Wednesday 2 July 2014
 */
export default function getDateInWords(date) {
  return date != null ? format(date, DATE_TIME_FORMAT) : 'N/A';
}
