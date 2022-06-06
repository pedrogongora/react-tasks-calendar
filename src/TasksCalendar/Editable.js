import React, {useState, useEffect} from 'react';

export default function Editable({
  text,
  classes = '',
  saveTitle = '',
  inputProps = {},
  autoFocus = false,
  editableOnly = false,
  useTextArea = false,
  onChange,
}) {
  const [edit, setEdit] = useState(editableOnly);
  const [value, setValue] = useState(text);
  //const valueProp = editableOnly ? {defaultValue: value} : {value: value};

  useEffect(() => {
    setValue(text);
  }, [text]);

  const click = () => setEdit(true);
  const change = (e) => {
    setValue(e.target.value);
    if (editableOnly) {
      onChange(e.target.value);
    }
  };
  const submit = (e) => {
    if (editableOnly) return;
    e.preventDefault();
    setEdit(false);
    if (onChange) onChange(value);
  };

  return (
    <>
      {edit && (
        <form className="d-inline" onSubmit={submit}>
          {useTextArea && (
            <textarea
              {...inputProps}
              value={value}
              onChange={change}
              autoFocus={autoFocus}
            />
          )}
          {!useTextArea && (
            <input
              {...inputProps}
              value={value}
              onChange={change}
              autoFocus={autoFocus}
            />
          )}
          {!editableOnly && (
            <button
              type="submit"
              className={`mx-1 btn btn-sm btn-primary ${
                useTextArea ? 'align-top' : ''
              }`}
              title={saveTitle}
            >
              &#x2714;
            </button>
          )}
        </form>
      )}
      {!edit && (
        <span className={classes} title="click para editar" onClick={click}>
          {(value === '' || (value === undefined && value === null)) && (
            <>&nbsp;</>
          )}
          {value !== undefined && value !== null && <>{value}</>}
        </span>
      )}
    </>
  );
}
