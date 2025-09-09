import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPessoasFiltro } from '../services/people';
import { PersonCard } from '../components/PersonCard';
import { Pagination } from '../components/Pagination';
import { SearchBar, SearchValues } from '../components/SearchBar';
import { Page, PessoaResumo } from '../types/people';
import { scrollToTop, scrollToElement } from '../utils';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';

export function Home() {
  const [page, setPage] = useState(0);
  const perPage = 10;
  
  const { value: filters, setValue: setFilters, handleValueChange } = useDebouncedSearch<SearchValues>(
    {},
    500, // Delay reduzido para melhor responsividade
    (newFilters) => setFilters(newFilters)
  );

  const query = useQuery<Page<PessoaResumo>>({
    queryKey: ['pessoas', filters, page, perPage],
    queryFn: () => {
      const filtrosProcessados = {
        ...filters,
        sexo: (filters.sexo && filters.sexo !== '') ? filters.sexo : undefined,
        status: (filters.status && filters.status !== '') ? filters.status : undefined,
        faixaIdadeInicial: (filters.faixaIdadeInicial === '' || isNaN(Number(filters.faixaIdadeInicial))) ? undefined : Number(filters.faixaIdadeInicial),
        faixaIdadeFinal: (filters.faixaIdadeFinal === '' || isNaN(Number(filters.faixaIdadeFinal))) ? undefined : Number(filters.faixaIdadeFinal),
        pagina: page,
        porPagina: perPage,
      };
      
      return getPessoasFiltro(filtrosProcessados);
    },
    // placeholderData: (previousData) => {
    //   console.log('🔍 Usando placeholderData:', previousData?.content?.length, 'pessoas');
    //   return previousData;
    // },
  });

  useEffect(() => { 
    setPage(0);
  }, [filters.nome, filters.sexo, filters.status, filters.faixaIdadeInicial, filters.faixaIdadeFinal]);

  useEffect(() => {
    scrollToTop();
  }, []);


  const [previousPage, setPreviousPage] = useState(page);
  
  useEffect(() => {
    if (previousPage !== page && previousPage !== undefined) {
      const timeoutId = setTimeout(() => {
        scrollToElement('resultados', 64);
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
    
    setPreviousPage(page);
  }, [page, previousPage]);




  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-slate-800">Plataforma Oficial do Governo de Mato Grosso</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Sistema de Busca de Pessoas
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ajude a encontrar pessoas desaparecidas ou envie informações sobre avistamentos. 
            <span className="block mt-2 text-base text-slate-500">
              Sua colaboração pode fazer a diferença na vida de uma família.
            </span>
          </p>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow-lg border border-slate-300 p-8">
        <SearchBar 
          onSubmit={(v)=>setFilters(v)} 
          onValuesChange={handleValueChange}
          defaultValues={filters} 
        />
      </section>

      <section id="resultados" className="bg-white rounded-2xl shadow-lg border border-slate-300 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              {query.data ? `${query.data.totalElements} pessoas encontradas` : 'Carregando...'}
            </h3>
            {query.data && (
              <p className="text-slate-700 mt-1">
                Página {page + 1} de {query.data.totalPages}
              </p>
            )}
          </div>
        </div>

        {query.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({length: perPage}).map((_,i)=>(
              <div key={i} className="bg-slate-100 rounded-2xl border border-slate-300 overflow-hidden">
                <div className="h-64 bg-slate-300 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-300 animate-pulse rounded-lg" />
                  <div className="h-3 bg-slate-300 animate-pulse rounded-lg w-2/3" />
                  <div className="h-3 bg-slate-300 animate-pulse rounded-lg w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {query.isError && (
          <div className="bg-amber-100 border border-amber-300 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-200 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Erro ao carregar dados</h3>
            <p className="text-slate-700 mb-6">{(query.error as Error).message}</p>
            <button 
              onClick={() => query.refetch()}
              className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors font-medium"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {query.data && query.data.content.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {query.data.content.map(p => <PersonCard key={p.id} p={p} />)}
          </div>
        )}

        {query.data && query.data.content.length === 0 && (
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-200 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Nenhuma pessoa encontrada</h3>
            <p className="text-slate-700">Tente ajustar os filtros de busca para encontrar mais resultados.</p>
          </div>
        )}
      </section>

      {query.data && query.data.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination page={page} totalPages={query.data.totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
