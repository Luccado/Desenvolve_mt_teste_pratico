import { api } from './api';
import { PessoaDetalhe, Estatistico, FiltroPessoas, InfoPayload } from '../types/people';
import { getPessoasFiltroMock, getPessoaMock, getEstatisticoMock } from './mockData';

export async function getPessoasFiltro(filtros: FiltroPessoas) {
  console.log('Usando dados mock com quantidades reais da API...');
  return getPessoasFiltroMock(filtros);
  
  // Código da API real comentado temporariamente para testar com dados mock
  /*
  try {
    const params = new URLSearchParams(
      Object.entries(filtros).reduce((acc, [k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          if (k.includes('Idade') || k.includes('pagina') || k.includes('porPagina')) {
            if (!isNaN(Number(v))) {
              acc[k] = String(v);
            }
          } else {
            acc[k] = String(v);
          }
        }
        return acc;
      }, {} as Record<string,string>)
    );
    
    console.log('Fazendo requisição para:', `/pessoas/aberto/filtro?${params.toString()}`);
    const { data } = await api.get<Page<PessoaResumo>>(`/pessoas/aberto/filtro?${params.toString()}`);
    
    if (!data || !Array.isArray(data.content)) {
      throw new Error('Dados inválidos recebidos da API');
    }
    
    console.log('Dados da API real carregados:', data.totalElements, 'pessoas');
    console.log('Primeira pessoa:', data.content[0]?.nome);
    return data;
  } catch (error) {
    console.error('Erro ao carregar dados da API:', error);
    console.log('Usando dados mock como fallback');
    return getPessoasFiltroMock(filtros);
  }
  */
}

export async function getPessoa(id: number) {
  console.log('Tentando carregar pessoa da API real, ID:', id);
  
  try {
    const { data } = await api.get<PessoaDetalhe>(`/pessoas/${id}`);
    
    if (!data || !data.id) {
      throw new Error('Dados inválidos recebidos da API');
    }
    
    console.log('Dados da pessoa carregados da API real:', data.nome);
    return data;
  } catch (error) {
    console.error('Erro ao carregar pessoa da API:', error);
    console.log('Usando dados mock como fallback');
    return getPessoaMock(id);
  }
}

export async function getEstatistico() {
  console.log('Tentando carregar estatísticas da API real...');
  
  try {
    const { data } = await api.get<Estatistico>(`/pessoas/aberto/estatistico`);
    
    if (!data || typeof data.quantPessoasDesaparecidas !== 'number') {
      throw new Error('Dados inválidos recebidos da API');
    }
    
    console.log('Estatísticas carregadas da API real:', data.quantPessoasDesaparecidas, 'desaparecidas,', data.quantPessoasEncontradas, 'encontradas');
    return data;
  } catch (error) {
    console.error('Erro ao carregar estatísticas da API:', error);
    console.log('Usando dados mock como fallback');
    return getEstatisticoMock();
  }
}

export async function postInformacao(p: InfoPayload) {
  const fd = new FormData();
  fd.append('ocoId', String(p.ocoId));
  fd.append('informacao', p.informacao);
  fd.append('descricao', p.descricao);
  fd.append('data', p.data);
  if (p.latitude !== undefined) fd.append('latitude', String(p.latitude));
  if (p.longitude !== undefined) fd.append('longitude', String(p.longitude));
  p.files?.slice(0,5).forEach(f => fd.append('files', f));
  const { data } = await api.post(`/ocorrencias/informacoes-desaparecido`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
