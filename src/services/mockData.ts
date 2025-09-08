import { Page, PessoaResumo, PessoaDetalhe, Estatistico } from '../types/people';

const mockPessoas: PessoaResumo[] = [
  {
    id: 1,
    nome: "Maria Silva Santos",
    idade: 25,
    sexo: "FEMININO",
    urlFoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1001,
      dtDesaparecimento: "2024-03-15T10:30:00.000Z",
      localDesaparecimentoConcat: "Centro, Cuiabá - MT",
      encontradoVivo: false,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Vestido azul, sandália branca",
        informacao: "Última vez vista na universidade"
      }
    }
  },
  {
    id: 2,
    nome: "João Pedro Oliveira",
    idade: 32,
    sexo: "MASCULINO",
    urlFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1002,
      dtDesaparecimento: "2024-02-20T14:15:00.000Z",
      localDesaparecimentoConcat: "Várzea Grande - MT",
      encontradoVivo: true,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Camisa branca, calça jeans",
        informacao: "Foi encontrado em bom estado de saúde"
      }
    }
  },
  {
    id: 3,
    nome: "Ana Carolina Costa",
    idade: 18,
    sexo: "FEMININO",
    urlFoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1003,
      dtDesaparecimento: "2024-01-10T08:45:00.000Z",
      localDesaparecimentoConcat: "Rondonópolis - MT",
      encontradoVivo: false,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Blusa rosa, short jeans",
        informacao: "Desapareceu após sair da escola"
      }
    }
  },
  {
    id: 4,
    nome: "Carlos Eduardo Lima",
    idade: 45,
    sexo: "MASCULINO",
    urlFoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1004,
      dtDesaparecimento: "2023-12-05T16:20:00.000Z",
      localDesaparecimentoConcat: "Sinop - MT",
      encontradoVivo: false,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Camisa xadrez, calça social",
        informacao: "Não retornou do trabalho"
      }
    }
  },
  {
    id: 5,
    nome: "Fernanda Rodrigues",
    idade: 28,
    sexo: "FEMININO",
    urlFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1005,
      dtDesaparecimento: "2024-04-02T12:30:00.000Z",
      localDesaparecimentoConcat: "Cuiabá - MT",
      encontradoVivo: true,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Vestido floral, sandália",
        informacao: "Foi localizada em outro estado"
      }
    }
  },
  {
    id: 6,
    nome: "Roberto Alves",
    idade: 55,
    sexo: "MASCULINO",
    urlFoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1006,
      dtDesaparecimento: "2023-11-18T09:15:00.000Z",
      localDesaparecimentoConcat: "Cáceres - MT",
      encontradoVivo: false,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Camisa polo, bermuda",
        informacao: "Desapareceu durante pescaria"
      }
    }
  },
  {
    id: 7,
    nome: "Juliana Mendes",
    idade: 22,
    sexo: "FEMININO",
    urlFoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1007,
      dtDesaparecimento: "2024-03-28T19:45:00.000Z",
      localDesaparecimentoConcat: "Várzea Grande - MT",
      encontradoVivo: false,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Blusa preta, calça jeans",
        informacao: "Não retornou da festa"
      }
    }
  },
  {
    id: 8,
    nome: "Marcos Antonio",
    idade: 38,
    sexo: "MASCULINO",
    urlFoto: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop",
    ultimaOcorrencia: {
      ocoId: 1008,
      dtDesaparecimento: "2024-01-25T11:00:00.000Z",
      localDesaparecimentoConcat: "Rondonópolis - MT",
      encontradoVivo: true,
      ocorrenciaEntrevDesapDTO: {
        vestimentasDesaparecido: "Camisa azul, calça jeans",
        informacao: "Foi encontrado em hospital"
      }
    }
  }
];

const mockEstatistico: Estatistico = {
  quantPessoasDesaparecidas: 5,
  quantPessoasEncontradas: 3,
  totalRegistros: 8,
  percentualEncontrados: 37.5
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getPessoasFiltroMock = async (filtros: any): Promise<Page<PessoaResumo>> => {
  await delay(500);
  
  let pessoasFiltradas = [...mockPessoas];
  
  if (filtros.nome) {
    pessoasFiltradas = pessoasFiltradas.filter(p => 
      p.nome.toLowerCase().includes(filtros.nome.toLowerCase())
    );
  }
  
  if (filtros.sexo) {
    pessoasFiltradas = pessoasFiltradas.filter(p => p.sexo === filtros.sexo);
  }
  
  if (filtros.status) {
    if (filtros.status === 'DESAPARECIDO') {
      pessoasFiltradas = pessoasFiltradas.filter(p => !p.ultimaOcorrencia.encontradoVivo);
    } else if (filtros.status === 'ENCONTRADO') {
      pessoasFiltradas = pessoasFiltradas.filter(p => p.ultimaOcorrencia.encontradoVivo);
    }
  }
  
  if (filtros.faixaIdadeInicial) {
    pessoasFiltradas = pessoasFiltradas.filter(p => p.idade >= filtros.faixaIdadeInicial);
  }
  
  if (filtros.faixaIdadeFinal) {
    pessoasFiltradas = pessoasFiltradas.filter(p => p.idade <= filtros.faixaIdadeFinal);
  }
  
  const pagina = filtros.pagina || 0;
  const porPagina = filtros.porPagina || 10;
  const inicio = pagina * porPagina;
  const fim = inicio + porPagina;
  
  const content = pessoasFiltradas.slice(inicio, fim);
  const totalPages = Math.ceil(pessoasFiltradas.length / porPagina);
  
  return {
    content,
    totalPages,
    totalElements: pessoasFiltradas.length,
    size: porPagina,
    number: pagina
  };
};

export const getPessoaMock = async (id: number): Promise<PessoaDetalhe> => {
  await delay(300);
  
  const pessoa = mockPessoas.find(p => p.id === id);
  if (!pessoa) {
    throw new Error('Pessoa não encontrada');
  }
  
  return pessoa;
};

export const getEstatisticoMock = async (): Promise<Estatistico> => {
  await delay(200);
  return mockEstatistico;
};

