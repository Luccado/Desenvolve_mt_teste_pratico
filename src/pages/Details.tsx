import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPessoa, postInformacao } from '../services/people';
import { StatusBadge } from '../components/StatusBadge';
import { useState } from 'react';
import { InfoForm } from '../components/InfoForm';
import { formatDate, formatDateForAPI } from '../utils';

export function Details() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pessoa', id],
    queryFn: () => getPessoa(Number(id)),
    enabled: !!id,
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return postInformacao({
        ocoId: data.ocoId,
        informacao: data.informacao,
        descricao: data.descricao,
        data: formatDateForAPI(data.data),
        files: data.files,
        latitude: data.coords?.lat,
        longitude: data.coords?.lng,
      });
    },
    onSuccess: (data) => {
      console.log('Informação enviada com sucesso:', data);
      setMessage({ type: 'success', text: 'Informação enviada com sucesso!' });
      setTimeout(() => setOpen(false), 2000);
    },
    onError: (error) => {
      console.error('Erro ao enviar informação:', error);
      setMessage({ type: 'error', text: 'Erro ao enviar informação. Tente novamente.' });
    },
  });

  const handleFormSubmit = (data: any) => {
    mutation.mutate({
      ...data,
      ocoId: p.ultimaOcorrencia.ocoId
    });
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div className="text-red-700">Erro: {(error as Error).message}</div>;
  if (!data) return null;

  const p = data;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-700">Início</a>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">Detalhes da Pessoa</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Foto e Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={p.urlFoto} 
                alt={p.nome} 
                className="w-full h-96 object-cover" 
              />
              <div className="absolute top-4 right-4">
                <StatusBadge encontradoVivo={p.ultimaOcorrencia.encontradoVivo} />
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{p.nome}</h1>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Idade</p>
                    <p className="font-semibold text-gray-900">{p.idade} anos</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sexo</p>
                    <p className="font-semibold text-gray-900">{p.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Detalhadas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações do Desaparecimento */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Informações do Desaparecimento</h2>
                <p className="text-sm text-gray-500">Dados sobre quando e onde a pessoa foi vista pela última vez</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Local do Desaparecimento</p>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-900">{p.ultimaOcorrencia.localDesaparecimentoConcat}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Data do Desaparecimento</p>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-900">{formatDate(p.ultimaOcorrencia.dtDesaparecimento)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vestimentas e Informações Adicionais */}
          {(p.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || p.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao) && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Informações Adicionais</h2>
                  <p className="text-sm text-gray-500">Detalhes sobre vestimentas e outras informações</p>
                </div>
              </div>

              <div className="space-y-4">
                {p.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Vestimentas</p>
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-900">{p.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}</p>
                    </div>
                  </div>
                )}

                {p.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Informações</p>
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-900">{p.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Botão de Ação */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tem informações sobre esta pessoa?</h3>
                <p className="text-gray-600">Ajude a encontrar esta pessoa registrando informações sobre avistamentos ou localizações.</p>
              </div>
              <button 
                onClick={()=>setOpen(true)} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Registrar Informação</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <InfoForm
          onClose={()=>setOpen(false)}
          onSubmit={handleFormSubmit}
          isLoading={mutation.isPending}
          message={message}
        />
      )}
    </div>
  );
}
