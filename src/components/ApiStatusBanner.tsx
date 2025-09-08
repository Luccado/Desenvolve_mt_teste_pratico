interface ApiStatusBannerProps {
  isApiAvailable: boolean | null;
  onRecheck: () => void;
}

export function ApiStatusBanner({ isApiAvailable, onRecheck }: ApiStatusBannerProps) {
  if (isApiAvailable === null) {
    return null;
  }

  if (isApiAvailable) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-green-800">API Conectada</h3>
              <p className="text-sm text-green-600">Dados em tempo real da API oficial do Abitus</p>
            </div>
          </div>
          <button
            onClick={onRecheck}
            className="text-green-600 hover:text-green-800 text-sm underline"
          >
            Re-verificar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Modo Demonstração</h3>
            <p className="text-sm text-yellow-600">
              A API oficial não está disponível no momento. Exibindo dados de demonstração para mostrar o funcionamento da aplicação.
            </p>
          </div>
        </div>
        <button
          onClick={onRecheck}
          className="text-yellow-600 hover:text-yellow-800 text-sm underline"
        >
          Re-verificar
        </button>
      </div>
    </div>
  );
}