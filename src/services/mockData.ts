import { Page, PessoaResumo, PessoaDetalhe, Estatistico } from '../types/people';

// Gerador de dados mock com quantidades reais da API
const generateMockPessoas = (): PessoaResumo[] => {
  const pessoas: PessoaResumo[] = [];
  const nomes = [
    "Maria Silva Santos", "João Pedro Oliveira", "Ana Carolina Costa", "Carlos Eduardo Lima",
    "Fernanda Rodrigues", "Roberto Alves", "Juliana Mendes", "Marcos Antonio", "Patricia Lima",
    "Ricardo Santos", "Camila Oliveira", "Diego Costa", "Larissa Silva", "Felipe Alves",
    "Gabriela Mendes", "Thiago Lima", "Isabela Santos", "Rafael Oliveira", "Beatriz Costa",
    "Lucas Silva", "Mariana Alves", "Pedro Mendes", "Amanda Lima", "Bruno Santos",
    "Carolina Oliveira", "Daniel Costa", "Eduarda Silva", "Fábio Alves", "Giovana Mendes",
    "Henrique Lima", "Ingrid Santos", "Júlio Oliveira", "Karina Costa", "Leandro Silva"
  ];
  
  const cidades = [
    "Cuiabá - MT", "Várzea Grande - MT", "Rondonópolis - MT", "Sinop - MT", "Cáceres - MT",
    "Barra do Garças - MT", "Tangará da Serra - MT", "Sorriso - MT", "Primavera do Leste - MT",
    "Nova Mutum - MT", "Campo Verde - MT", "Lucas do Rio Verde - MT", "Pontes e Lacerda - MT",
    "Alta Floresta - MT", "Colíder - MT", "Juína - MT", "Mirassol d'Oeste - MT", "Poconé - MT"
  ];
  
  const vestimentas = [
    "Camisa azul, calça jeans", "Vestido floral, sandália", "Blusa preta, calça jeans",
    "Camisa branca, calça social", "Vestido rosa, sandália branca", "Camisa polo, bermuda",
    "Blusa amarela, short jeans", "Camisa xadrez, calça social", "Vestido azul, sandália",
    "Camisa verde, calça jeans", "Blusa roxa, calça social", "Camisa vermelha, bermuda"
  ];
  
  const informacoes = [
    "Última vez vista na universidade", "Foi encontrado em bom estado de saúde",
    "Desapareceu após sair da escola", "Não retornou do trabalho", "Foi localizada em outro estado",
    "Desapareceu durante pescaria", "Não retornou da festa", "Foi encontrado em hospital",
    "Última vez vista no shopping", "Desapareceu durante viagem", "Foi localizada em casa de parentes",
    "Não retornou da igreja", "Desapareceu durante passeio", "Foi encontrado em delegacia"
  ];
  
  // 428 pessoas DESAPARECIDAS (encontradoVivo: false)
  for (let i = 1; i <= 428; i++) {
    const nome = nomes[i % nomes.length] + (i > nomes.length ? ` ${Math.floor(i / nomes.length) + 1}` : '');
    const cidade = cidades[i % cidades.length];
    const vestimenta = vestimentas[i % vestimentas.length];
    const informacao = informacoes[i % informacoes.length];
    
    pessoas.push({
      id: i,
      nome,
      idade: Math.floor(Math.random() * 70) + 1,
      sexo: Math.random() > 0.5 ? "MASCULINO" : "FEMININO",
      urlFoto: Math.random() > 0.1 ? `https://picsum.photos/300/400?random=${i}` : "",
      ultimaOcorrencia: {
        ocoId: 1000 + i,
        dtDesaparecimento: new Date(2023 + Math.random(), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        localDesaparecimentoConcat: cidade,
        encontradoVivo: false,
        ocorrenciaEntrevDesapDTO: {
          vestimentasDesaparecido: vestimenta,
          informacao
        }
      }
    });
  }
  
  // 753 pessoas LOCALIZADAS (encontradoVivo: true)
  for (let i = 429; i <= 1181; i++) {
    const nome = nomes[i % nomes.length] + (i > nomes.length ? ` ${Math.floor(i / nomes.length) + 1}` : '');
    const cidade = cidades[i % cidades.length];
    const vestimenta = vestimentas[i % vestimentas.length];
    const informacao = informacoes[i % informacoes.length];
    
    pessoas.push({
      id: i,
      nome,
      idade: Math.floor(Math.random() * 70) + 1,
      sexo: Math.random() > 0.5 ? "MASCULINO" : "FEMININO",
      urlFoto: Math.random() > 0.1 ? `https://picsum.photos/300/400?random=${i}` : "",
      ultimaOcorrencia: {
        ocoId: 1000 + i,
        dtDesaparecimento: new Date(2023 + Math.random(), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        localDesaparecimentoConcat: cidade,
        encontradoVivo: true,
        ocorrenciaEntrevDesapDTO: {
          vestimentasDesaparecido: vestimenta,
          informacao
        }
      }
    });
  }
  
  return pessoas;
};

const mockPessoas: PessoaResumo[] = generateMockPessoas();

const mockEstatistico: Estatistico = {
  quantPessoasDesaparecidas: 428,
  quantPessoasEncontradas: 753,
  totalRegistros: 1181,
  percentualEncontrados: 63.8
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

