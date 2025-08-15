const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 1, label: 'Alta' },
  { value: 2, label: 'Media' },
  { value: 3, label: 'Baja' },
];

const SORT_FIELDS = [
  { value: 'created_at', label: 'Fecha de Creación' },
  { value: 'updated_at', label: 'Fecha de Actualización' },
  { value: 'due_date', label: 'Fecha de Vencimiento' },
  { value: 'priority', label: 'Prioridad' },
  { value: 'title', label: 'Título' },
];

const SORT_ORDERS = [
  { value: 'asc', label: 'Ascendente' },
  { value: 'desc', label: 'Descendente' },
];

export default function TaskFilters({
  status, setStatus,
  priority, setPriority,
  sortBy, setSortBy,
  sortOrder, setSortOrder,
  search, setSearch,
  setPage
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-6">
      
      {/* Estado */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label className="font-semibold whitespace-nowrap">Estado:</label>
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Prioridad */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label className="font-semibold whitespace-nowrap">Prioridad:</label>
        <select
          value={priority}
          onChange={e => { setPriority(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Ordenar por */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label className="font-semibold whitespace-nowrap">Ordenar por:</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {SORT_FIELDS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Orden */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label className="font-semibold whitespace-nowrap">Orden:</label>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {SORT_ORDERS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Buscar */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto flex-1">
        <label className="font-semibold whitespace-nowrap">Buscar:</label>
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Título o descripción"
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

    </div>
  );
}
