export const addTask = (task) => ({type: 'ADD_TASK', task});

export const updateTask = (task) => ({type: 'UPDATE_TASK', task});

export const selectTask = (id) => ({type: 'SELECT_TASK', id});

export const deleteTask = (id) => ({type: 'DELETE_TASK', id});

export const setYear = (y) => ({type: 'SET_YEAR', year: y});

export const setMonth = (m) => ({type: 'SET_MONTH', month: m});

export const previousMonth = () => ({type: 'PREVIOUS_MONTH'});

export const nextMonth = () => ({type: 'NEXT_MONTH'});
