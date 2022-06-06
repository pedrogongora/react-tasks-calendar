import React from 'react';
import {taskTimes} from './helpers';

export default function Task({task, selectTask}) {
  const [start, end] = taskTimes(task);

  const drag = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
  };
  const onClick = () => selectTask(task.id);

  return (
    <div className="task" draggable={true} onDragStart={drag} onClick={onClick}>
      <div className="task-time">
        {start}&nbsp;—&nbsp;{end}
      </div>
      <div className="task-icon">
        {/* <img src={task.img} alt="Icono tarea" /> */}
        <i className={task.img}></i>
      </div>
      <div className="task-title">{task.title}</div>
    </div>
  );
}
