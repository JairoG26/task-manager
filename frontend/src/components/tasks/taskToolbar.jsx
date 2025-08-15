import TaskFilters from './taskFilters';

export default function TaskToolbar({
  status, setStatus,
  priority, setPriority,
  sortBy, setSortBy,
  sortOrder, setSortOrder,
  search, setSearch,
  onAdd
}) {
  return (
<div className="mb-6 flex flex-col gap-4 md:flex-row md:gap-6 p-4 bg-gray-50 rounded-md shadow-sm justify-between">
      <div className="justify-between">
        <TaskFilters
          status={status} setStatus={setStatus}
          priority={priority} setPriority={setPriority}
          sortBy={sortBy} setSortBy={setSortBy}
          sortOrder={sortOrder} setSortOrder={setSortOrder}
          search={search} setSearch={setSearch}
          setPage={() => {}}
        />
      </div>
      
      <div className="md:flex md:items-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2 rounded shadow-md transition duration-300 w-full sm:w-fit md:w-auto"
          onClick={onAdd}
        >
          Añadir Tarea
        </button>
      </div>

    </div>
  );
}