import React, {useState} from 'react';
import moment from 'moment';
import {byDate, monthMondays} from './helpers/tasks-utils';
import Task from './Task';
import {compose, take, toUpperCase, isToday} from './util';

const ISO = {
  days: [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ],
};

export default function Calendar({
  date,
  tasks,
  updateTask,
  selectTask,
  showPanel,
}) {
  const mondays = monthMondays(date);

  return (
    <div className="calendar">
      <Header />
      {mondays.map((monday) => (
        <Week
          key={monday.toString()}
          monday={monday}
          tasks={tasks}
          updateTask={updateTask}
          selectTask={selectTask}
          showPanel={showPanel}
        />
      ))}
    </div>
  );
}

function Header() {
  const daynameComponent = compose(
    (s) => <Dayname key={s} dayname={s} />,
    take(3),
    toUpperCase
  );

  return <div className="header">{ISO.days.map(daynameComponent)}</div>;
}

function Dayname({dayname}) {
  return <div className="dayname">{dayname}</div>;
}

function Week({monday, tasks, updateTask, selectTask, showPanel}) {
  const days = Array(7)
    .fill(null)
    .map((_, i) => i + 1)
    .map((i) => moment(monday).isoWeekday(i))
    .map((d) => (
      <Day
        key={d.toString()}
        date={d}
        tasks={byDate(d)(tasks)}
        selectTask={selectTask}
        updateTask={updateTask}
        showPanel={showPanel}
      />
    ));

  return (
    <>
      <div className="week">{days}</div>
    </>
  );
}

function Day({date, tasks, updateTask, selectTask, showPanel}) {
  const [dragover, setDragover] = useState(false);

  const m = moment(date);
  const day = m.date();
  const classes = `${isToday(date) ? 'today' : ''} ${
    dragover ? 'drag-over' : ''
  }`;

  const click = () => {
    const m = moment(date);
    showPanel(m.year(), m.month(), m.date());
  };
  const dragEnter = (e) => {
    setDragover(true);
    e.preventDefault();
    e.stopPropagation();
  };
  const dragLeave = (e) => {
    setDragover(false);
    e.preventDefault();
    e.stopPropagation();
  };
  const drop = (e) => {
    const json = e.dataTransfer.getData('application/json');
    const dropTask = JSON.parse(json);
    const d = moment(dropTask.date);
    d.year(date.year());
    d.month(date.month());
    d.date(date.date());
    const t = {...dropTask, date: d};
    updateTask(t);
    setDragover(false);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`day ${classes}`}
      onDragOver={dragEnter}
      onDragLeave={dragLeave}
      onDrop={drop}
    >
      <div className="name text-center small font-weight-bold">{day}</div>
      <div className="tasks">
        {tasks.map((t) => (
          <Task key={t.id} task={t} selectTask={selectTask} />
        ))}
      </div>
      <div className={`add ${classes}`}>
        <button type="button" onClick={click}>
          +
        </button>
      </div>
    </div>
  );
}
