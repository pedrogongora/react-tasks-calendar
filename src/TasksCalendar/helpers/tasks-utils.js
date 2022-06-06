import moment from 'moment';
import {
  concat,
  compose,
  curry,
  eq,
  filter,
  find,
  prop,
  sameDay,
  startOf,
  endOf,
  mondayOf,
  sameOrBefore,
} from '../util';

// add :: String -> Number -> Moment
export const add = curry((what, amount, m) => m.add(amount, what));

// subtract :: String -> Number -> Moment
export const subtract = curry((what, amount, m) => m.subtract(amount, what));

// byDate :: Date -> [Task] -> [Task]
export const byDate = curry((d, xs) =>
  filter(compose(sameDay(d), moment, prop('date')), xs)
);

// (Int | String) -> [Task] -> Task
export const byId = curry((id, xs) => find(compose(eq(id), prop('id')), xs));

// formatTime :: Moment -> String
const formatTime = (m) => m.format('h:mm a');

// taskTime :: Task -> String
export const taskTime = compose(formatTime, prop('date'));

// taskTime :: Task -> [String]   (returns: [start, end])
export const taskTimes = compose(
  ([t1, t2]) => [formatTime(t1), formatTime(t2)],
  ([t, d]) => [t, add('m', d, moment(t))],
  (x) => [prop('date', x), prop('duration', x)]
);

const nextWeek = compose(add('week', 1), moment);

// monthMondays :: Moment -> [Moment]
export const monthMondays = (d) => {
  const m = moment(d);
  const start = mondayOf(startOf('month', m));
  const end = mondayOf(endOf('month', m));
  const computeMondays = (s, e, acc) =>
    sameOrBefore('day', e, s)
      ? computeMondays(nextWeek(s), e, concat(acc, [s]))
      : acc;

  const ms = computeMondays(start, end, []);
  return ms;
};

export const emptyTask = (y, m, d) => ({
  title: '',
  date: moment(`${y}/${m}/${d} 12:00:00`),
  duration: 60,
  allDay: false,
  notes: '',
});
