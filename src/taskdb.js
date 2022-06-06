import moment from 'moment'

let tasks = [];
let nextId = 1

const sortDB = () => {
  const cf = (a, b) =>
    a.date.isBefore(b.date)
      ? -1
      : b.date.isBefore(a.date)
        ? 1
        : 0
  tasks.sort(cf)
}

export const newTask = (title, date, duration, allDay, completed, notes) => {
  const newTask = {
    id: nextId++,
    title,
    date: moment(date),
    duration,
    allDay,
    completed,
    img: 'fas fa-igloo',
    //img: 'https://picsum.photos/50?r=' + Math.random(),
    notes,
  }
  tasks.push(newTask)
  sortDB()
  return newTask
}

export const getTasks = (from, to) => {
  const f = (t) =>
    t.date.isSameOrAfter(moment(from)) && t.date.isSameOrBefore(moment(to))
  return tasks.filter(f)
}

export const updTask = (task) => {
  tasks = tasks.filter((t) => t.id !== task.id)
  tasks.push(task)
  sortDB()
}

export const delTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id)
  console.log('delTask db:', tasks)
}

newTask('Tarea 1', '2020-07-25 12:00:00', 60, false, false, '')
newTask('Tarea 2', '2020-07-27 12:00:00', 40, false, false, '')
newTask('Tarea 3', '2020-07-28 12:00:00', 60, false, false, '')
newTask('Tarea 4', '2020-07-25 12:00:00', 15, false, false, '')
newTask('Tarea 5', '2020-08-03 10:00:00', 50, false, false, '')
newTask('Tarea 6', '2020-08-03 11:00:00', 60, false, false, '')
newTask('Tarea 7', '2020-08-05 12:00:00', 15, false, false, '')
newTask('Tarea 8', '2020-08-08 12:00:00', 60, false, false, '')
newTask('Tarea 9', '2020-08-15 12:00:00', 10, false, false, '')
