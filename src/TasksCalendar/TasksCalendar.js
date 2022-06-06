import React, {useReducer, useState, useEffect} from 'react';
import moment from 'moment';

import {
  addTask,
  deleteTask,
  updateTask,
  selectTask,
  nextMonth,
  previousMonth,
  setMonth,
  setYear,
} from './actions';
import {reducer, initialState} from './reducers';
import {compose} from './util';
import {emptyTask} from './helpers';

import Calendar from './Calendar';
import TaskPanel from './TaskPanel';
import Toolbar from './Toolbar';
import DeletePanel from './DeletePanel';
import CompletePanel from './CompletePanel';
import NewTaskPanel from './NewTaskPanel';

import './TasksCalendar.css';

/**
 * Identificador de un CalendarTask
 * @typedef {number|string} TaskId
 */

/**
 * Tarea del calendario
 *
 * @typedef CalendarTask
 * @property {TaskId}        CalendarTask#id        - Identificador de la tarea
 * @property {string}        CalendarTask#title     - Título de la tarea
 * @property {string|Date}   CalendarTask#date      - Fecha y hora de la tarea
 * @property {number}        CalendarTask#duration  - Duración de la tarea en minutos
 * @property {bool}          CalendarTask#completed - La tarea está completada
 * @property {string}        [CalendarTask#img]     - URL del icono de la tarea
 * @property {string}        [CalendarTask#notes]   - Notas sobre la tarea
 */

/**
 * Calendario de tareas
 *
 * @param {string|Date}    [date]  - primer día a mostrar (se muestra a partir del lunes inmediato anterior)
 * @param {CalendarTask[] -> Callback} [onCreateTask] - callback para crear una nueva tarea
 * @param {TaskId -> Callback}         [onReadTask]   - callback para crear una nueva tarea
 * @param {CalendarTask -> Callback}   [onUpdateTask] - callback para crear una nueva tarea
 * @param {TaskId -> Callback}         [onDeleteTask] - callback para crear una nueva tarea
 */
export default function TasksCalendar({
  date = new Date(),
  onCreateTask,
  onReadTasks,
  onUpdateTask,
  onDeleteTask,
}) {
  const [state, dispatch] = useReducer(reducer, initialState(date));
  const {tasks, currentTask, year, month} = state;
  const [showPanel, setShowPanel] = useState(false);
  const [panelYear, setPanelYear] = useState(0);
  const [panelMonth, setPanelMonth] = useState(0);
  const [panelDay, setPanelDay] = useState(0);

  const panelVisible = showPanel || currentTask;
  const calendarClasses = `calendarWrap2 col-12 col-md-${
    panelVisible ? 9 : 12
  }`;
  const panelClasses = panelVisible
    ? 'panelWrap o-1 col-12 col-md-3'
    : 'panelWrap o-0 w-0';
  const panelTask = currentTask
    ? currentTask
    : emptyTask(panelYear, panelMonth + 1, panelDay);
  const d = moment(
    `${state.year}-${(state.month + 101 + '').slice(1)}-01`,
    'YYYY-MM-DD'
  );

  const openPanel = (y, m, d) => {
    setPanelYear(y);
    setPanelMonth(m);
    setPanelDay(d);
    setShowPanel(true);
    dispatch(selectTask(null));
  };
  const savePanelTask = (task) => {
    if (currentTask) {
      compose(dispatch, updateTask)(task);
      onUpdateTask(task);
    } else {
      onCreateTask(
        task,
        compose(() => setShowPanel(false), dispatch, addTask)
      );
    }
    dispatch(setYear(task.date.year()));
    dispatch(setMonth(task.date.month()));
  };
  const completePanelTask = (task) => {
    compose(dispatch, updateTask)(task);
    onUpdateTask(task);
  };
  const deletePanelTask = (id) => {
    onDeleteTask(id);
    dispatch(deleteTask(id));
    dispatch(selectTask(null));
    setShowPanel(false);
  };

  useEffect(() => {
    const from = moment(d)
      .startOf('month')
      .startOf('week')
      .toDate();
    const to = moment(d)
      .endOf('month')
      .endOf('week')
      .toDate();
    onReadTasks(
      from,
      to,
      ts => ts.map(compose(dispatch, addTask))
    );
  }, [year, month]);

  return (
    <div className="tasksCalendar">
      <div className="row">
        <div className="col-12">
          <Toolbar
            year={year}
            month={month}
            nextMonth={compose(dispatch, nextMonth)}
            previousMonth={compose(dispatch, previousMonth)}
            setYear={compose(dispatch, setYear)}
            setMonth={compose(dispatch, setMonth)}
          />
        </div>

        <div className="calendarWrap col-12">
          <div className="row">
            <div className={calendarClasses}>
              <Calendar
                date={d}
                tasks={tasks.filter((t) => !t.completed)}
                showPanel={openPanel}
                updateTask={(t) => {compose(dispatch, updateTask)(t); onUpdateTask(t);}}
                selectTask={compose(dispatch, selectTask)}
              />
            </div>
            <div className={panelClasses}>
              {panelVisible && (
                <>
                  {!!panelTask.id && (
                    <TaskPanel
                      key={`task-${panelTask.id}-${panelTask.date.format()}`}
                      task={panelTask}
                      save={savePanelTask}
                      close={() => {
                        setShowPanel(false);
                        dispatch(selectTask(null));
                      }}
                    />
                  )}
                  {!!!panelTask.id && (
                    <NewTaskPanel
                      key={`newtask-${panelTask.date.format()}`}
                      task={panelTask}
                      save={savePanelTask}
                      close={() => {
                        setShowPanel(false);
                        dispatch(selectTask(null));
                      }}
                    />
                  )}
                  {!!panelTask.id && (
                    <CompletePanel
                      task={panelTask}
                      updateTask={completePanelTask}
                      close={() => {
                        setShowPanel(false);
                        dispatch(selectTask(null));
                      }}
                    />
                  )}
                  {!!panelTask.id && (
                    <DeletePanel
                      task={panelTask}
                      deleteTask={deletePanelTask}
                      close={() => {
                        setShowPanel(false);
                        dispatch(selectTask(null));
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
