import api from '../../../api';

export default function TaskDeleteModal({ task, onTaskDeleted, onClose }) {
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onTaskDeleted?.();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-task-title"
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      onClick={e => e.stopPropagation()}
    >
      <h2 id="delete-task-title" className="text-xl font-bold mb-5 text-center">
        Eliminar tarea
      </h2>
      <p className="mb-6 text-center">
        ¿Estás seguro de que deseas eliminar la tarea <strong>"{task.title}"</strong>?
      </p>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 shadow-sm transition"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 shadow-sm transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
  );
}