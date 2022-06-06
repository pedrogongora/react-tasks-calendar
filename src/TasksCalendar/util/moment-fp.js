import moment from 'moment';
import {compose, curry} from './fp';

// startOf :: String -> Moment -> Moment
export const startOf = curry((type, what) => moment(what).startOf(type));

// endOf :: String -> Moment -> Moment
export const endOf = curry((type, what) => moment(what).endOf(type));

// isoWeekday :: Int -> Moment -> Moment
export const isoWeekday = curry((n, m) => moment(m).isoWeekday(n));

// sameOrBefore :: String -> Date -> Boolean
export const sameOrBefore = curry((precision, when, what) =>
  moment(what).isSameOrBefore(when, precision)
);

// sameOrAfter :: String -> Date -> Boolean
export const sameOrAfter = curry((precision, when, what) =>
  moment(what).isSameOrAfter(when, precision)
);

// sameDayOrBefore :: Date -> Boolean
export const sameDayOrBefore = sameOrBefore('day');

// sameDayOrAfter :: Date -> Boolean
export const sameDayOrAfter = sameOrAfter('day');

// sameDay :: Date -> Date -> Boolean
export const sameDay = curry(
  (when, what) => sameDayOrBefore(when, what) && sameDayOrAfter(when, what)
);

// isToday :: Moment -> Boolean
export const isToday = sameDay(moment());

// mondayOf :: (String | Date | Moment) -> Moment
export const mondayOf = compose(isoWeekday(1), moment);
