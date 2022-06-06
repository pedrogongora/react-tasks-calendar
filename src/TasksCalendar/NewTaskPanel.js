import React, {useState, useEffect} from 'react';
import moment from 'moment';

export default function NewTaskPanel({task, save, close}) {
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date.format('YYYY-MM-DD'));
  const [time, setTime] = useState(task.date.format('HH:mm'));
  const [duration, setDuration] = useState(task.duration);
  const [notes, setNotes] = useState(task.notes);

  const saveDisabled = !title || !date || !time || duration < 0;
  const saveTask = () => {
    save({
      ...task,
      title,
      date: moment(`${date} ${time}:00`),
      duration,
      notes,
    });
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeDate = (e) => setDate(e.target.value);
  const onChangeTime = (e) => setTime(e.target.value);
  const onChangeDuration = (e) => setDuration(parseInt(e.target.value));
  const onChangeNotes = (e) => setNotes(e.target.value);

  useEffect(() => {
    setTitle(task.title);
    setDate(task.date.format('YYYY-MM-DD'));
    setTime(task.date.format('HH:mm'));
    setDuration(task.duration);
    setNotes(task.notes);
  }, [task.id, task.title, task.date, task.duration, task.notes]);

  return (
    <div className="task-panel">
      <div className="clearfix">
        <button
          type="button"
          className="btn font-weight-bold close"
          onClick={close}
        >
          &times;
        </button>
      </div>

      <div className="mb-3">
        <div className="small">Título:</div>
        <input
          key={`${task.id}-title`}
          type="text"
          size="10"
          value={title}
          autoFocus={true}
          onChange={onChangeTitle}
        />
      </div>

      <div className="mb-2">
        <div className="small">Fecha:</div>
        <input
          key={`${task.id}-date`}
          type="date"
          value={date}
          onChange={onChangeDate}
        />
      </div>

      <div className="mb-2">
        <div className="small">Hora:</div>
        <input
          key={`${task.id}-time`}
          type="time"
          value={time}
          onChange={onChangeTime}
        />
      </div>

      <div className="mb-2">
        <div className="small">Duración (minutos):</div>
        <input
          key={`${task.id}-duration`}
          type="number"
          value={duration}
          size="4"
          min="0"
          onChange={onChangeDuration}
        />
      </div>

      <div className="mb-2">
        <div className="small">Notas:</div>
        <textarea
          key={`${task.id}-notes`}
          value={notes}
          className="border border-light"
          cols="10"
          rows="3"
          onChange={onChangeNotes}
        />
      </div>

      {!task.id && (
        <div className="text-right">
          <button
            type="button"
            className="mt-3 mr-2 btn btn-secondary"
            onClick={close}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="mt-3 btn btn-primary"
            disabled={saveDisabled}
            onClick={saveTask}
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
}
