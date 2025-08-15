import { useState, useEffect } from "react";
import api from "../../../api";

export default function TaskEditModal({ task, onTaskUpdated, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "pendiente");
      setPriority(task.priority || 3);
      setDueDate(task.due_date ? task.due_date.split("T")[0] : "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      status,
      priority,
      due_date: dueDate || null
    };
    try {
      await api.put(`/tasks/${task.id}`, taskData);
      onTaskUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return null;

  return (
    <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="edit-task-title"
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={e => e.target === e.currentTarget && onClose()}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      onClick={e => e.stopPropagation()}
    >
      <h2 id="edit-task-title" className="text-xl font-bold mb-5 text-center">
        Editar tarea
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="edit-title" className="sr-only">Título</label>
          <input
            id="edit-title"
            type="text"
            placeholder="Título *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition border-gray-300"
            required
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="edit-description" className="sr-only">Descripción</label>
          <textarea
            id="edit-description"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border rounded px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition border-gray-300"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="edit-status" className="block font-semibold mb-1">Estado</label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition border-gray-300"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-priority" className="block font-semibold mb-1">Prioridad</label>
            <select
              id="edit-priority"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition border-gray-300"
            >
              <option value={1}>Alta</option>
              <option value={2}>Media</option>
              <option value={3}>Baja</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="edit-dueDate" className="block font-semibold mb-1">Fecha de vencimiento</label>
          <input
            id="edit-dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition border-gray-300"
          />
        </div>
        <div className="flex justify-between gap-3 mt-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 shadow-sm transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 shadow-sm transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}