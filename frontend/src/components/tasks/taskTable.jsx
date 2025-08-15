import TaskItem from './taskItem';

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <ul className="min-w-max">
        {/* Header visible solo en pantallas >= sm */}
        <li className="hidden sm:grid grid-cols-[200px_350px_150px_100px_130px_130px_130px_120px] gap-4 px-4 py-3 bg-gray-100 rounded-t font-bold uppercase text-gray-700 text-sm border-b border-gray-300">
          <span>Título</span>
          <span>Descripción</span>
          <span>Estado</span>
          <span>Prioridad</span>
          <span>Fecha Vencimiento</span>
          <span>Creación</span>
          <span>Actualización</span>
          <span className="text-right">Acciones</span>
        </li>

        {/* Título de lista solo para móviles */}
        <li className="sm:hidden px-4 py-3 bg-gray-100 rounded-t font-semibold text-gray-700 text-lg border-b border-gray-300">
          Lista de Tareas
        </li>

        {/* Items */}
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
          />
        ))}
      </ul>
    </div>
  );
}
