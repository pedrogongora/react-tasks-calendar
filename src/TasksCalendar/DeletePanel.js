import React, {useState} from 'react';

export default function DeletePanel({task, deleteTask, close}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const clickLink = () => setShowConfirm(true);
  const clickConfirm = () => {
    deleteTask(task.id);
    setShowConfirm(false);
    close();
  };

  return (
    <>
      <div className="delete-panel">
        <div>
          <button
            className="btn btn-link btn-sm text-danger"
            onClick={clickLink}
          >
            Eliminar tarea
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
              className="btn btn-danger"
              onClick={clickConfirm}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
