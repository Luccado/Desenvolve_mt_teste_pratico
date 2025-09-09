import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from './components/Header.tsx';
import { ScrollToTopButton } from './components/ScrollToTopButton.tsx';
import { scrollToTop } from './utils';
import { useScrollStatus } from './hooks/useScrollStatus';
import { getEstatistico } from './services/people';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = useScrollStatus(10);
  
  const estat = useQuery({ queryKey: ['estatistico'], queryFn: getEstatistico });

  const handleHeaderNavigation = () => {
    const isHomePage = location.pathname === '/';
    const isDetailsPage = location.pathname.startsWith('/pessoa/');
    
    if (isDetailsPage) {
      navigate('/');
    } else if (isHomePage) {
      scrollToTop();
    } else {
      navigate('/');
    }
  };

  const handleScrollToTop = () => {
    scrollToTop();
  };

  const stats = estat.isSuccess ? {
    total: estat.data.quantPessoasDesaparecidas + estat.data.quantPessoasEncontradas,
    desaparecidas: estat.data.quantPessoasDesaparecidas,
    encontradas: estat.data.quantPessoasEncontradas
  } : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col">
      <Header isScrolled={isScrolled} onNavigation={handleHeaderNavigation} stats={stats} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 w-full">
        <Outlet />
      </main>
      
      <footer className="bg-slate-800 border-t border-slate-600 mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
              © 2025 Desenvolve MT. Sistema de busca de pessoas desaparecidas.
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-300">
              <span>API: Abitus</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-center">Desenvolvido para o projeto prático do Desenvolve MT - Lucca Oliveira</span>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopButton isScrolled={isScrolled} onScrollToTop={handleScrollToTop} />
    </div>
  );
}