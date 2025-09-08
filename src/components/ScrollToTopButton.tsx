interface ScrollToTopButtonProps {
  isScrolled: boolean;
  onScrollToTop: () => void;
}

export function ScrollToTopButton({ isScrolled, onScrollToTop }: ScrollToTopButtonProps) {
  if (!isScrolled) return null;

  return (
    <button
      onClick={onScrollToTop}
      className="fixed bottom-8 right-8 bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 hover:scale-110"
      aria-label="Voltar ao topo"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}