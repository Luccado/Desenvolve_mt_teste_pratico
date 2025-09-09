export type Sexo = 'MASCULINO' | 'FEMININO';
export type Status = 'ENCONTRADO' | 'DESAPARECIDO';

export interface OcorrenciaEntrevDesapDTO {
  vestimentasDesaparecido?: string;
  informacao?: string;
}

export interface UltimaOcorrencia {
  ocoId: number;
  dtDesaparecimento: string;
  localDesaparecimentoConcat: string;
  encontradoVivo: boolean;
  ocorrenciaEntrevDesapDTO?: OcorrenciaEntrevDesapDTO;
}

export interface PessoaResumo {
  id: number;
  nome: string;
  idade: number;
  sexo: Sexo;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface Estatistico {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
  totalRegistros: number;
  percentualEncontrados: number;
}

export interface PessoaDetalhe extends PessoaResumo {}

export interface FiltroPessoas {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: Sexo;
  status?: Status;
  pagina?: number;
  porPagina?: number;
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

export interface SearchValues {
  nome?: string;
  sexo?: Sexo | '';
  status?: Status | '';
  faixaIdadeInicial?: number | '';
  faixaIdadeFinal?: number | '';
}
