import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sexo, Status, SearchValues } from '../types/people';

interface SearchBarProps {
  onSubmit: (v: SearchValues) => void;
  defaultValues?: Partial<SearchValues>;
  onValuesChange?: (v: SearchValues) => void;
}

export function SearchBar({ onSubmit, defaultValues, onValuesChange }: SearchBarProps) {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<SearchValues>({ defaultValues });
  
  const watchedValues = watch();
  
  if (onValuesChange) {
    onValuesChange(watchedValues);
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Busca Rápida</h3>
        <button
          type="button"
          onClick={() => setIsAdvancedMode(!isAdvancedMode)}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors text-sm font-medium"
        >
          <svg className={`w-4 h-4 transition-transform ${isAdvancedMode ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span>Busca Avançada</span>
        </button>
      </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800">Nome</label>
              <input 
                {...register('nome')} 
                placeholder="Digite o nome da pessoa" 
                className="w-full px-4 py-3 border border-slate-400 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors bg-white" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800">Sexo</label>
              <select 
                {...register('sexo')} 
                className="w-full px-4 py-3 border border-slate-400 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors bg-white"
              >
                <option value="">Todos os sexos</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800">Status</label>
              <select 
                {...register('status')} 
                className="w-full px-4 py-3 border border-slate-400 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors bg-white"
              >
                <option value="">Todos os status</option>
                <option value="DESAPARECIDO">Desaparecido</option>
                <option value="ENCONTRADO">Localizado</option>
              </select>
            </div>
          </div>
          
          {isAdvancedMode && (
            <div className="border-t border-slate-300 pt-6">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-slate-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <h4 className="text-md font-semibold text-slate-800">Filtros Avançados</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-800">Idade Mínima</label>
                  <input 
                    type="number" 
                    {...register('faixaIdadeInicial', { valueAsNumber: true })} 
                    placeholder="Ex: 18" 
                    min="0"
                    max="120"
                    className="w-full px-4 py-3 border border-slate-400 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors bg-white" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-800">Idade Máxima</label>
                  <input 
                    type="number" 
                    {...register('faixaIdadeFinal', { valueAsNumber: true })} 
                    placeholder="Ex: 65" 
                    min="0"
                    max="120"
                    className="w-full px-4 py-3 border border-slate-400 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors bg-white" 
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6">
            <button 
              type="button" 
              onClick={()=>reset()} 
              className="px-6 py-3 border border-slate-400 text-slate-800 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Limpar Filtros
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors font-medium flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar Agora
            </button>
          </div>
        </form>
    </div>
  );
}