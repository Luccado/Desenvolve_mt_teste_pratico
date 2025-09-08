import { api } from './api';
import { Page, PessoaResumo, PessoaDetalhe, Estatistico, Sexo, Status } from '../types/people';
import { getPessoasFiltroMock, getPessoaMock, getEstatisticoMock } from './mockData';

let apiAvailable: boolean | null = null;
let lastApiCheck: number = 0;
const API_CHECK_INTERVAL = 30000;

async function checkApiAvailability(): Promise<boolean> {
  const now = Date.now();
  
  if (apiAvailable !== null && (now - lastApiCheck) < API_CHECK_INTERVAL) {
    return apiAvailable;
  }
  
  try {
    const response = await fetch('/api/pessoas/aberto/estatistico', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    
    const isOk = response.ok && response.status === 200;
    apiAvailable = isOk;
    lastApiCheck = now;
    
    if (apiAvailable) {
      console.log('API está disponível - Status:', response.status);
    } else {
      console.warn('API não está respondendo corretamente - Status:', response.status);
    }
    
    return apiAvailable;
  } catch (error) {
    console.warn('Erro ao verificar API:', error);
    apiAvailable = false;
    lastApiCheck = now;
    return false;
  }
}

export function resetApiAvailability() {
  apiAvailable = null;
  lastApiCheck = 0;
  console.log('Cache da API resetado, próxima requisição verificará novamente');
}

export interface FiltroPessoas {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: Sexo;
  status?: Status;
  pagina?: number;
  porPagina?: number;
}

export async function getPessoasFiltro(filtros: FiltroPessoas) {
  console.log('Tentando carregar dados da API real...');
  
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

export interface InfoPayload {
  ocoId: number | string;
  informacao: string;
  descricao: string;
  data: string;
  files?: File[];
  latitude?: number;
  longitude?: number;
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
