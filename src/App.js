import React from 'react';
import TasksCalendar from './TasksCalendar/TasksCalendar';
import * as db from './taskdb';

function App() {
  const createTasksCallback = (t, cb) => cb(db.newTask(t.title, t.date, t.duration, false, false, t.notes));
  const readTasksCallback = (f, t, cb) => cb(db.getTasks(f, t));
  const updateTasksCallback = (t) => db.updTask(t);
  const deleteTasksCallback = (id) => db.delTask(id);

  return (
    <>
      <div>
        <TasksCalendar
          onCreateTask={createTasksCallback}
          onReadTasks={readTasksCallback}
          onUpdateTask={updateTasksCallback}
          onDeleteTask={deleteTasksCallback}
        />
      </div>
    </>
  );
}

export default App;
