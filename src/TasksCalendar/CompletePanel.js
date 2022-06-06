import React, {useState} from 'react';

export default function CompletePanel({task, updateTask, close}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const clickLink = () => setShowConfirm(true);
  const clickConfirm = () => {
    const t = {
      ...task,
      completed: true,
    };
    updateTask(t);
    setShowConfirm(false);
    close();
  };

  return (
    <>
      <div className="delete-panel">
        <div>
          <button
            className="btn btn-link btn-sm text-primary"
            onClick={clickLink}
          >
            Completar tarea
          </button>
        </div>
        {showConfirm && (
          <div className="mt-3 text-right">
            <button
              type="button"
              className="btn btn-secondary mr-1"
              onClick={() => {
                setShowConfirm(false);
                close();
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={clickConfirm}
            >
              Completar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
