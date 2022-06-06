import React, { useState } from 'react';

export function TaskForm({addTask}) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [duration, setDuration] = useState(60);
  const [allDay, setAllDay] = useState(false);
  const [notes, setNotes] = useState('');

  const changeTitle = handlerFrom(setTitle);
  const changeTime = handlerFrom(setTime);
  const changeDuration = handlerFrom(setDuration);
  const changeNotes = handlerFrom(setNotes);
  const submit = () => {};

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="title">
          <input type="text" id="title" name="title" value={title} onChange={changeTitle} />
        </label>
        <label htmlFor="time">
          <input type="time" id="time" name="time" value={time} onChange={changeTime} />
        </label>
        <label htmlFor="duration">
          <input type="number" id="duration" name="duration" value={duration} onChange={changeDuration} />
        </label>
        <label htmlFor="allDay">
          <input type="checkbox" id="allDay" name="allDay" value={allDay} checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
        </label>
        <label htmlFor="notes">
          <input type="text" id="notes" name="notes" value={notes} onChange={changeNotes} />
        </label>
      </form>
    </>
  );
}

function handlerFrom(setter) {
  return (e) => setter(e.target.value);
}
