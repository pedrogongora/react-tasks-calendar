import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Editable from './Editable';

export default function TaskPanel({task, save, close}) {
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date.format('YYYY-MM-DD'));
  const [time, setTime] = useState(task.date.format('HH:mm'));
  const [duration, setDuration] = useState(task.duration);
  const [notes, setNotes] = useState(task.notes);
  const [changed, setChanged] = useState(false);

  const saveDisabled = !title || !date || !time || duration < 0 || !changed;

  const onChangeTitle = (title) => {
    save({
      ...task,
      title,
    });
  };
  const onChangeDate = (date) => {
    save({
      ...task,
      date: moment(`${date} ${time}:00`),
    });
  };
  const onChangeTime = (time) => {
    save({
      ...task,
      date: moment(`${date} ${time}:00`),
    });
  };
  const onChangeDuration = (duration) => {
    save({
      ...task,
      duration: parseInt(duration),
    });
  };
  const onChangeNotes = (notes) => {
    save({
      ...task,
      notes,
    });
  };

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
        {!task.id && <div className="small">Título:</div>}
        <Editable
          key={`${task.id}-title`}
          text={title}
          classes="editable-span d-block h2"
          saveTitle="Guardar"
          inputProps={{type: 'text', size: 10, required: true}}
          autoFocus={true}
          onChange={onChangeTitle}
        />
      </div>

      <div className="mb-2">
        <div className="small">Fecha:</div>
        <Editable
          key={`${task.id}-date`}
          text={date}
          classes="editable-span d-block "
          saveTitle="Guardar"
          inputProps={{type: 'date', required: true}}
          autoFocus={true}
          onChange={onChangeDate}
        />
      </div>

      <div className="mb-2">
        <div className="small">Hora:</div>
        <Editable
          key={`${task.id}-time`}
          text={time}
          classes="editable-span d-block "
          saveTitle="Guardar"
          inputProps={{type: 'time', required: true}}
          autoFocus={true}
          onChange={onChangeTime}
        />
      </div>

      <div className="mb-2">
        <div className="small">Duración (minutos):</div>
        <Editable
          key={`${task.id}-duration`}
          text={duration}
          classes="editable-span d-block "
          saveTitle="Guardar"
          inputProps={{type: 'number', size: 4, min: 0, required: true}}
          autoFocus={true}
          onChange={onChangeDuration}
        />
      </div>

      <div className="mb-2">
        <div className="small">Notas:</div>
        <Editable
          key={`${task.id}-notes`}
          text={notes}
          classes="editable-span d-block border border-light"
          saveTitle="Guardar"
          inputProps={{cols: 10, rows: 3}}
          autoFocus={true}
          useTextArea={true}
          onChange={onChangeNotes}
        />
      </div>
    </div>
  );
}
