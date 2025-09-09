import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PessoaResumo } from '../types/people';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils';

export function PersonCard({ p }: { p: PessoaResumo }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.log('Erro ao carregar imagem para:', p.nome, 'URL:', p.urlFoto);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('Imagem carregada com sucesso para:', p.nome);
    setImageLoading(false);
  };

  // Verificar se a URL da imagem é válida
  useEffect(() => {
    if (!p.urlFoto || p.urlFoto.trim() === '') {
      console.log('URL da imagem vazia para:', p.nome);
      setImageError(true);
      setImageLoading(false);
    }
  }, [p.urlFoto, p.nome]);

  return (
    <Link 
      to={`/pessoa/${p.id}`} 
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        {!imageError && p.urlFoto && p.urlFoto.trim() !== '' ? (
          <img 
            src={p.urlFoto} 
            alt={p.nome} 
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-gray-500 text-sm">Foto não disponível</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge encontradoVivo={p.ultimaOcorrencia.encontradoVivo} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 group-hover:scale-105 transition-transform duration-300 origin-bottom">
          <h3 className="text-white font-semibold text-lg mb-1">{p.nome}</h3>
          <p className="text-white/90 text-sm">Idade: {p.idade} anos</p>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{p.ultimaOcorrencia.localDesaparecimentoConcat}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Desaparecido em: {formatDate(p.ultimaOcorrencia.dtDesaparecimento)}</span>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Clique para ver detalhes</span>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}