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
