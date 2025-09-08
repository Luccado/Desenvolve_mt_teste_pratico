interface HeaderProps {
  isScrolled: boolean;
  onNavigation: () => void;
  stats?: {
    total: number;
    desaparecidas: number;
    encontradas: number;
  };
}

export function Header({ isScrolled, onNavigation, stats }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 shadow-lg border-b border-slate-300 z-[10001] transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-800/95 backdrop-blur-sm' 
        : 'bg-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={onNavigation} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <svg className="w-10 h-10" viewBox="0 0 100 40" fill="none">
                    <path 
                      d="M10 30 L30 20 L50 10 L70 20 L90 30" 
                      stroke="#60A5FA" 
                      strokeWidth="3" 
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    <span className="text-slate-100">DESENVOLVE</span>
                    <span className="text-blue-400"> MT</span>
                  </h1>
                  <p className="text-xs text-slate-300">Sistema de Busca de Pessoas</p>
                </div>
              </div>
            </button>
          </div>
          
          {stats && (
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-100">{stats.total}</div>
                <div className="text-xs text-slate-300">Total</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400">{stats.desaparecidas}</div>
                <div className="text-xs text-slate-300">Desaparecidas</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">{stats.encontradas}</div>
                <div className="text-xs text-slate-300">Localizadas</div>
              </div>
            </div>
          )}
          
          <nav className="flex items-center space-x-8">
            <button 
              onClick={onNavigation}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-slate-700 text-slate-200 hover:bg-slate-600"
            >
              Início
            </button>
            
            <div className="flex items-center space-x-2 text-sm text-slate-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}