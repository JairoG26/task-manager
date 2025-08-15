import { useState, useCallback, useEffect } from 'react';
import api from '../../api';
import TaskToolbar from './taskToolbar';
import TaskTable from './taskTable';
import Pagination from '../pagination/pagination';
import TaskModals from './taskModals';

export default function TaskContainer() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [taskToAdd, setTaskToAdd] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
    <div className="w-full px-2 sm:px-4 lg:px-8 mx-auto mt-4 sm:mt-8">
      <div className="mb-4">
        <TaskToolbar
          status={status} setStatus={setStatus}
          priority={priority} setPriority={setPriority}
          sortBy={sortBy} setSortBy={setSortBy}
          sortOrder={sortOrder} setSortOrder={setSortOrder}
          search={search} setSearch={setSearch}
          onAdd={() => setTaskToAdd({})}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <TaskTable
          tasks={tasks}
          onEdit={setTaskToEdit}
          onDelete={setTaskToDelete}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      <TaskModals
        taskToAdd={taskToAdd} setTaskToAdd={setTaskToAdd}
        taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit}
        taskToDelete={taskToDelete} setTaskToDelete={setTaskToDelete}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}