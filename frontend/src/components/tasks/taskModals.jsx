import TaskAddModal from './modals/taskAddModal';
import TaskEditModal from './modals/taskEditModal';
import TaskDeleteModal from './modals/taskDeleteModal';

export default function TaskModals({
  taskToAdd, setTaskToAdd,
  taskToEdit, setTaskToEdit,
  taskToDelete, setTaskToDelete,
  fetchTasks
}) {
  return (
    <>
      {taskToAdd && (
        <TaskAddModal
          onTaskCreated={fetchTasks}
          onClose={() => setTaskToAdd(null)}
        />
      )}
      <TaskEditModal
        task={taskToEdit}
        onTaskUpdated={fetchTasks}
        onClose={() => setTaskToEdit(null)}
      />
      {taskToDelete && (
        <TaskDeleteModal
          task={taskToDelete}
          onTaskDeleted={fetchTasks}
          onClose={() => setTaskToDelete(null)}
        />
      )}
    </>
  );
}