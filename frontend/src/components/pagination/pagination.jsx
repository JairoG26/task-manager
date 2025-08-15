export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-4 select-none">
      <button
        className={`px-4 py-2 rounded-md transition
          ${page <= 1 || totalPages === 0 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'}
        `}
        disabled={page <= 1 || totalPages === 0}
        onClick={() => setPage(page - 1)}
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <span className="font-semibold text-gray-700 text-sm min-w-[60px] text-center">
        {totalPages === 0 ? '0 / 0' : `${page} / ${totalPages}`}
      </span>

      <button
        className={`px-4 py-2 rounded-md transition
          ${page >= totalPages || totalPages === 0 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'}
        `}
        disabled={page >= totalPages || totalPages === 0}
        onClick={() => setPage(page + 1)}
        aria-label="Página siguiente"
      >
        Siguiente →
      </button>
    </div>
  );
}