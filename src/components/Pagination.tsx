export function Pagination({ page, totalPages, onChange }:{
  page: number; totalPages: number; onChange: (n:number)=>void;
}) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page + 1 - delta); i <= Math.min(totalPages - 1, page + 1 + delta); i++) {
      range.push(i);
    }

    if (page + 1 - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + 1 + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
      <button 
        disabled={page <= 0} 
        onClick={() => onChange(page - 1)}
        className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-base text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden xs:inline">Anterior</span>
      </button>

      <div className="flex items-center space-x-0 sm:space-x-1">
        {getVisiblePages().map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={index} className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-500">...</span>
          ) : (
            <button
              key={index}
              onClick={() => onChange((pageNum as number) - 1)}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                page + 1 === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {pageNum}
            </button>
          )
        ))}
      </div>

      <button 
        disabled={page >= totalPages - 1} 
        onClick={() => onChange(page + 1)}
        className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-base text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        <span className="hidden xs:inline">Próxima</span>
        <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}