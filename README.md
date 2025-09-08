# 🚀 Sistema de Busca de Pessoas - Desenvolve MT

## 📋 Dados de Inscrição

**Nome:** Lucca Souza Di Oliveira  
**Email:** luccadioliveira@gmail.com  

---

## 🎯 Sobre o Projeto

Sistema web para busca de pessoas desaparecidas desenvolvido para o programa Desenvolve MT. A aplicação permite buscar pessoas por nome, idade, sexo e status, com integração à API oficial do Abitus e fallback para dados mockados quando necessário.

### ✨ Funcionalidades

- 🔍 **Busca Avançada**: Filtros por nome, idade, sexo e status
- 📊 **Estatísticas**: Dashboard com números de desaparecidos e encontrados
- 🔄 **Paginação**: Navegação entre páginas de resultados
- 📱 **Responsivo**: Interface adaptada para mobile e desktop
- 🚀 **Docker**: Containerização completa da aplicação
- 🔧 **Fallback**: Dados mockados quando a API não está disponível

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Containerização**: Docker + Docker Compose
- **Web Server**: Nginx
- **API**: Integração com Abitus API

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

---

## 🚀 Instalação e Execução

### Opção 1: Docker (Recomendado)

#### 1. Clone o repositório
```bash
git clone (https://github.com/Luccado/Desenvolve_mt_teste_pratico.git)
cd desenvolve_MT
```

#### 2. Execute com Docker Compose
```bash
# Construir e executar
docker-compose up -d --build

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

#### 3. Acesse a aplicação
- **URL**: http://localhost:3000
- **API**: http://localhost:3000/api/

### Opção 2: Desenvolvimento Local

#### 1. Instale as dependências
```bash
npm install
```

#### 2. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as variáveis conforme necessário
VITE_API_BASE_URL=http://localhost:3000/api
```

#### 3. Execute em modo desenvolvimento
```bash
npm run dev
```

#### 4. Acesse a aplicação
- **URL**: http://localhost:3000

---

## 🧪 Testes

### Testes Automatizados

#### 1. Testes unitários
```bash
npm run test
```

#### 2. Testes de integração
```bash
npm run test:integration
```

#### 3. Testes E2E
```bash
npm run test:e2e
```

### Testes Manuais

#### 1. Teste de Funcionalidades Básicas
-  Acessar a página inicial
-  Verificar carregamento das estatísticas
-  Testar busca por nome
-  Testar filtros de idade
-  Testar filtros de sexo
-  Testar filtros de status

#### 2. Teste de Responsividade
-  Testar em desktop (1920x1080)
-  Testar em tablet (768x1024)
-  Testar em mobile (375x667)

#### 3. Teste de Performance
-  Tempo de carregamento inicial < 3s
-  Tempo de resposta da busca < 2s
-  Navegação entre páginas < 1s

#### 4. Teste de Integração com API
-  Verificar conexão com API oficial
-  Testar fallback para dados mockados
-  Verificar status da API no banner

---


## 📁 Estrutura do Projeto

```
desenvolve_MT/
├── src/
│   ├── components/          # Componentes React
│   ├── pages/              # Páginas da aplicação
│   ├── services/           # Serviços de API
│   ├── types/              # Definições TypeScript
│   └── utils/              # Utilitários
├── public/                 # Arquivos estáticos
├── nginx.conf             # Configuração do Nginx
├── Dockerfile             # Configuração do Docker
├── docker-compose.yml     # Orquestração Docker
└── package.json           # Dependências do projeto
```

---

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `VITE_API_BASE_URL` | URL base da API | `/api` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `PORT` | Porta do servidor | `3000` |


## 🚨 Solução de Problemas

### Problemas Comuns

#### 1. Erro de Porta em Uso
```bash
# Verificar processos na porta 3000
netstat -ano | findstr :3000

# Parar processo
taskkill /PID [PID] /F
```

#### 2. Erro de Build Docker
```bash
# Limpar cache Docker
docker system prune -a

# Reconstruir imagem
docker build --no-cache -t desenvolve-mt .
```

#### 3. Erro de Dependências
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install
```

#### 4. API Não Responde
- Verificar se a API está online
- Verificar configuração do proxy no nginx.conf
- Verificar logs do container: `docker logs [CONTAINER_ID]`

---

## 📊 Monitoramento

### Logs da Aplicação
```bash
# Docker Compose
docker-compose logs -f

# Container específico
docker logs -f [CONTAINER_ID]
```

### Métricas de Performance
- **Tempo de resposta**: < 2s
- **Uso de memória**: < 512MB
- **Uso de CPU**: < 50%

---


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
