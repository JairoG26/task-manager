function TaskItem({ task, onDelete, onEdit }) {
  return (
    <li
      className="grid grid-cols-1 sm:grid-cols-[200px_350px_150px_100px_130px_130px_130px_120px]
      gap-4 p-4 border-b items-start sm:items-center text-sm sm:text-base
      bg-white rounded-lg sm:rounded-none shadow-sm sm:shadow-none"
    >
      {/* Título */}
      <span className={task.status === "completada" ? "line-through text-gray-400" : ""}>
        {task.title}
      </span>

      {/* Descripción */}
      <span className="break-words whitespace-normal">
        {task.description}
      </span>

      {/* Estado */}
      <span className={
        "px-2 py-1 rounded font-semibold w-fit text-xs sm:text-base " +
        (task.status === "pendiente"
          ? "bg-yellow-200 text-yellow-800"
          : task.status === "en_progreso"
          ? "bg-blue-200 text-blue-800"
          : "bg-green-200 text-green-800")
      }>
        {task.status === "en_progreso"
          ? "En progreso"
          : task.status === "pendiente"
          ? "Pendiente"
          : "Completada"}
      </span>

      {/* Prioridad */}
      <span className={
        "px-2 py-1 rounded font-semibold w-fit text-xs sm:text-base " +
        (task.priority === 1
          ? "bg-red-200 text-red-800"
          : task.priority === 2
          ? "bg-yellow-200 text-yellow-800"
          : "bg-green-200 text-green-800")
      }>
        {task.priority === 1
          ? "Alta"
          : task.priority === 2
          ? "Media"
          : "Baja"}
      </span>

      {/* Fecha vencimiento */}
      <span className="whitespace-nowrap">
        {task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}
      </span>

      {/* Fecha creación */}
      <span className="whitespace-nowrap">
        {task.created_at ? new Date(task.created_at).toLocaleDateString() : '—'}
      </span>

      {/* Fecha actualización */}
      <span className="whitespace-nowrap">
        {task.updated_at ? new Date(task.updated_at).toLocaleDateString() : '—'}
      </span>

      {/* Acciones */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;