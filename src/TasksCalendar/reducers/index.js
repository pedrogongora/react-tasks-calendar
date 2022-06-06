import moment from 'moment';
import {prop, filter, compose, neq} from '../util';
import {byId} from '../helpers';

export const initialState = (date) => {
  return {
    tasks: [],
    currentTask: null,
    year: moment(date).year(),
    month: moment(date).month(),
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return addTask(state, action.task);
    case 'UPDATE_TASK':
      return updateTask(state, action.task);
    case 'DELETE_TASK':
      return deleteTask(state, action.id);
    case 'SELECT_TASK':
      return selectTask(state, action.id);
    case 'SET_YEAR':
      return setYear(state, action.year);
    case 'SET_MONTH':
      return setMonth(state, action.month);
    case 'PREVIOUS_MONTH':
      return previousMonth(state);
    case 'NEXT_MONTH':
      return nextMonth(state);
    default:
      return state;
  }
};

const compareTasks = (t1, t2) => {
  const s1 = t1.date.format();
  const s2 = t2.date.format();
  if (s1 < s2) return -1;
  if (s1 > s2) return 1;
  return 0;
};

const addTask = (state, task) => {
  if (byId(task.id, state.tasks)) return state;
  const tasks = [...state.tasks, task].sort(compareTasks);

  return {
    ...state,
    tasks,
  };
};

const updateTask = (state, task) => {
  const f = compose(neq(task.id), prop('id'));
  const ts = filter(f, state.tasks);
  const tasks = [...ts, task].sort(compareTasks);
  const currentTask =
    state.currentTask === null ? null : byId(state.currentTask.id, state.tasks);

  return {
    ...state,
    tasks,
    currentTask,
  };
};

const deleteTask = (state, id) => {
  const f = compose(neq(id), prop('id'));
  const tasks = filter(f, state.tasks);

  return {
    ...state,
    tasks,
  };
};

const selectTask = (state, id) => {
  const currentTask = id === null ? null : byId(id, state.tasks);

  return {
    ...state,
    currentTask,
  };
};

const setYear = (state, year) => {
  return {
    ...state,
    year,
  };
};

const setMonth = (state, month) => {
  return {
    ...state,
    month,
  };
};

const previousMonth = (state) => {
  const month = state.month === 0 ? 11 : state.month - 1;
  const year = state.month === 0 ? state.year - 1 : state.year;

  return {
    ...state,
    year,
    month,
  };
};

const nextMonth = (state) => {
  const month = state.month === 11 ? 0 : state.month + 1;
  const year = state.month === 11 ? state.year + 1 : state.year;

  return {
    ...state,
    year,
    month,
  };
};
