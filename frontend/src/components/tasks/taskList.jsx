import { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import TaskItem from './taskItem';
import TaskFilters from './taskFilters';
import Pagination from '../pagination/pagination';
import TaskEditModal from './modals/taskEditModal';
import TaskAddModal from './modals/taskAddModal';
import TaskDeleteModal from './modals/taskDeleteModal';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToAdd, setTaskToAdd] = useState(null);


  const fetchTasks = useCallback(async () => {
    const params = { page, sortBy, sortOrder };
    if (status) params.status = status;
    if (priority) params.priority = priority;
    if (search) params.search = search;
    try {
      const response = await api.get('/tasks', { params });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages || 0);
    } catch {
      setTasks([]);
      setTotalPages(0);
    }
  }, [page, status, priority, sortBy, sortOrder, search]);




  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="w-screen mx-auto mt-8 overflow-x-auto">
      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => setTaskToAdd({})}>Añadir Tarea</button>
      {taskToAdd && <TaskAddModal onTaskCreated={fetchTasks} onClose={() => setTaskToAdd(null)} />}
      <h2 className="text-xl font-bold mb-4 text-center">Task List</h2>

      <TaskFilters
        status={status} setStatus={setStatus}
        priority={priority} setPriority={setPriority}
        sortBy={sortBy} setSortBy={setSortBy}
        sortOrder={sortOrder} setSortOrder={setSortOrder}
        search={search} setSearch={setSearch}
        setPage={setPage}
      />

      <ul>
        <li className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-2 bg-gray-200 rounded-t font-bold">
          <span>Título</span>
          <span>Descripción</span>
          <span>Estado</span>
          <span>Prioridad</span>
          <span>Fecha de Vencimiento</span>
          <span>Fecha de Creación</span>
          <span>Fecha de Actualización</span>
          <span className="text-right">Acciones</span>
        </li>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={() => setTaskToDelete(task)} onEdit={() => setTaskToEdit(task)} />
        ))}
      </ul>
    
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      {taskToDelete && (
        <TaskDeleteModal
          task={taskToDelete}
          onTaskDeleted={fetchTasks}
          onClose={() => setTaskToDelete(null)}
        />
      )}
      <TaskEditModal
        task={taskToEdit}
        onTaskUpdated={fetchTasks}
        onClose={() => setTaskToEdit(null)}
    />
    </div>

  );
  
}

export default TaskList;