# Fluxograma do Sistema Smart Zenn Digital

## 1. Visão Geral do Sistema

O Smart Zenn Digital é um sistema integrado para gestão de consultórios odontológicos que oferece funcionalidades completas para administração, agendamento, financeiro, campanhas de marketing, mensageria e relatórios. O sistema possui integração com APIs externas como PayGo para pagamentos e Zenn Discador para mensageria.

## 2. Estrutura de Páginas e Fluxos

### 2.1. Fluxo de Autenticação

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│  Login Page │────▶│ Autenticação│────▶│ Admin Dashboard │
│             │     │             │     │                 │
└─────────────┘     └─────────────┘     └─────────────────┘
       │                                         │
       │                                         │
       ▼                                         ▼
┌─────────────┐                         ┌─────────────────┐
│             │                         │                 │
│ Recuperação │                         │ Acesso a Módulos│
│ de Senha    │                         │                 │
│             │                         └─────────────────┘
└─────────────┘
```

### 2.2. Fluxo Principal de Navegação

```
                          ┌─────────────────┐
                          │                 │
                          │ Admin Dashboard │
                          │                 │
                          └─────────────────┘
                                   │
                                   │
           ┌───────────┬───────────┼───────────┬───────────┬───────────┐
           │           │           │           │           │           │
           ▼           ▼           ▼           ▼           ▼           ▼
    ┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐
    │             ││             ││             ││             ││             ││             │
    │Agendamentos ││ Financeiro  ││ Campanhas   ││ Mensageria  ││ Relatórios  ││Configurações│
    │             ││             ││             ││             ││             ││             │
    └─────────────┘└─────────────┘└─────────────┘└─────────────┘└─────────────┘└─────────────┘
           │           │           │           │           │           │
           │           │           │           │           │           │
           └───────────┴───────────┼───────────┴───────────┴───────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │                 │
                          │ Whatsapp        │
                          │ Interface       │
                          │                 │
                          └─────────────────┘
```

### 2.3. Fluxo de Agendamentos

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Calendário  │────▶│ Novo        │────▶│ Confirmação     │
│             │     │ Agendamento │     │ Agendamento     │
└─────────────┘     └─────────────┘     └─────────────────┘
       │                  │                     │
       │                  │                     │
       ▼                  ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Visualizar  │     │ Selecionar  │     │ Notificação     │
│ Agendamentos│     │ Paciente    │     │ via WhatsApp    │
│             │     │             │     │                 │
└─────────────┘     └─────────────┘     └─────────────────┘
```

### 2.4. Fluxo Financeiro e Pagamentos

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Financeiro  │────▶│ Geração de  │────▶│ Integração      │
│             │     │ Pagamentos  │     │ PayGo           │
└─────────────┘     └─────────────┘     └─────────────────┘
       │                  │                     │
       │                  │                     │
       ▼                  ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Relatórios  │     │ Tipos de    │     │ Envio via       │
│ Financeiros │     │ Pagamento   │     │ Mensageria      │
│             │     │             │     │                 │
└─────────────┘     └─────────────┘     └─────────────────┘
```

### 2.5. Fluxo de Mensageria

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Mensageria  │────▶│ Importação  │────▶│ Integração      │
│             │     │ Excel       │     │ Zenn Discador   │
└─────────────┘     └─────────────┘     └─────────────────┘
       │                  │                     │
       │                  │                     │
       ▼                  ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Envio de    │     │ Templates   │     │ Histórico de    │
│ Mensagens   │     │ de Mensagem │     │ Mensagens       │
│             │     │             │     │                 │
└─────────────┘     └─────────────┘     └─────────────────┘
```

## 3. Descrição Detalhada das Páginas e Funcionalidades

### 3.1. Autenticação e Acesso

#### 3.1.1. Página de Login (index.html)
- **Funcionalidades:**
  - Autenticação de usuários com usuário e senha
  - Opção de recuperação de senha
  - Interface moderna com design inspirado no consultório odontológico com IA
- **Integrações:**
  - Sistema de autenticação
  - Banco de dados de usuários

#### 3.1.2. Dashboard Administrativo (admin-dashboard.html)
- **Funcionalidades:**
  - Visão geral do sistema
  - Métricas e indicadores principais
  - Acesso rápido a todos os módulos
  - Notificações e alertas
- **Integrações:**
  - Todos os módulos do sistema
  - API de notificações

### 3.2. Módulo de Agendamentos

#### 3.2.1. Calendário de Agendamentos
- **Funcionalidades:**
  - Visualização de agendamentos por dia, semana e mês
  - Identificação visual de status (confirmado, pendente, cancelado)
  - Filtros por profissional, procedimento e paciente
- **Integrações:**
  - Banco de dados de agendamentos
  - Módulo de pacientes

#### 3.2.2. Cadastro de Novo Agendamento
- **Funcionalidades:**
  - Seleção de data e horário
  - Seleção de profissional
  - Seleção de procedimento
  - Cadastro ou seleção de paciente
  - Observações e requisitos especiais
- **Integrações:**
  - Banco de dados de agendamentos
  - Módulo de pacientes
  - Módulo de mensageria para confirmações

#### 3.2.3. Gestão de Agendamentos
- **Funcionalidades:**
  - Confirmação de agendamentos
  - Reagendamento
  - Cancelamento
  - Histórico de alterações
- **Integrações:**
  - Banco de dados de agendamentos
  - Módulo de mensageria para notificações

### 3.3. Módulo Financeiro

#### 3.3.1. Visão Geral Financeira
- **Funcionalidades:**
  - Dashboard financeiro
  - Receitas e despesas
  - Fluxo de caixa
  - Contas a receber e a pagar
- **Integrações:**
  - Banco de dados financeiro
  - Módulo de relatórios

#### 3.3.2. Geração de Pagamentos (geracao-pagamentos.html)
- **Funcionalidades:**
  - Criação de links de pagamento
  - Geração de boletos
  - Geração de códigos PIX
  - Processamento de pagamentos com cartão
  - Histórico de transações
- **Integrações:**
  - API PayGo
  - Banco de dados de transações
  - Módulo de mensageria para envio de cobranças

#### 3.3.3. Configurações de Pagamento (configuracoes-pagamento.html)
- **Funcionalidades:**
  - Configuração das chaves da API PayGo
  - Seleção de ambiente (sandbox/produção)
  - Teste de conexão com a API
  - Configuração de métodos de pagamento aceitos
- **Integrações:**
  - API PayGo
  - Banco de dados de configurações

### 3.4. Módulo de Campanhas

#### 3.4.1. Gestão de Campanhas (campanhas.html)
- **Funcionalidades:**
  - Criação de campanhas de marketing
  - Segmentação de público-alvo
  - Agendamento de envios
  - Análise de resultados
- **Integrações:**
  - Banco de dados de campanhas
  - Módulo de mensageria
  - Módulo de relatórios

#### 3.4.2. Templates de Campanhas
- **Funcionalidades:**
  - Criação e edição de templates
  - Personalização de mensagens
  - Visualização prévia
  - Biblioteca de templates
- **Integrações:**
  - Banco de dados de templates
  - Módulo de mensageria

### 3.5. Módulo de Mensageria

#### 3.5.1. Central de Mensageria (mensageria.html)
- **Funcionalidades:**
  - Envio de mensagens individuais
  - Envio de mensagens em massa
  - Importação de contatos via Excel
  - Histórico de mensagens
- **Integrações:**
  - API Zenn Discador
  - Banco de dados de mensagens
  - Módulo de campanhas

#### 3.5.2. Importação de Contatos
- **Funcionalidades:**
  - Upload de arquivo Excel
  - Validação de formato (nome e telefone)
  - Visualização prévia dos dados
  - Processamento e importação
- **Integrações:**
  - API Zenn Discador
  - Banco de dados de contatos

#### 3.5.3. Interface WhatsApp (whatsapp-interface.html)
- **Funcionalidades:**
  - Visualização de conversas
  - Resposta a mensagens
  - Envio de mídia e documentos
  - Automações e respostas rápidas
- **Integrações:**
  - API Zenn Discador
  - Banco de dados de conversas

### 3.6. Módulo de Relatórios

#### 3.6.1. Relatórios Gerenciais (relatorios.html)
- **Funcionalidades:**
  - Relatórios de agendamentos
  - Relatórios financeiros
  - Relatórios de campanhas
  - Relatórios de mensageria
  - Exportação em diversos formatos
- **Integrações:**
  - Todos os módulos do sistema
  - Banco de dados central

#### 3.6.2. Dashboards Analíticos
- **Funcionalidades:**
  - Visualizações gráficas
  - Indicadores de desempenho (KPIs)
  - Filtros personalizáveis
  - Análises comparativas
- **Integrações:**
  - Todos os módulos do sistema
  - Banco de dados central

### 3.7. Módulo de Configurações

#### 3.7.1. Configurações Gerais (configuracoes.html)
- **Funcionalidades:**
  - Configurações do sistema
  - Gerenciamento de usuários
  - Permissões e acessos
  - Personalização da interface
- **Integrações:**
  - Banco de dados de configurações
  - Sistema de autenticação

#### 3.7.2. Integrações
- **Funcionalidades:**
  - Configuração da API PayGo
  - Configuração da API Zenn Discador
  - Testes de conexão
  - Logs de integração
- **Integrações:**
  - APIs externas
  - Banco de dados de configurações

## 4. Integrações e Fluxos de Dados

### 4.1. Integração PayGo

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Configuração│────▶│ Geração de  │────▶│ API PayGo       │
│ PayGo       │     │ Pagamento   │     │ ControlPay      │
└─────────────┘     └─────────────┘     └─────────────────┘
                                                │
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │                 │
                                        │ Retorno da      │
                                        │ Transação       │
                                        │                 │
                                        └─────────────────┘
                                                │
                                                │
                    ┌───────────────────────────┴───────────────────────────┐
                    │                           │                           │
                    ▼                           ▼                           ▼
            ┌─────────────┐             ┌─────────────┐             ┌─────────────┐
            │             │             │             │             │             │
            │ Registro no │             │ Envio via   │             │ Notificação │
            │ Sistema     │             │ Mensageria  │             │ por E-mail  │
            │             │             │             │             │             │
            └─────────────┘             └─────────────┘             └─────────────┘
```

### 4.2. Integração Zenn Discador

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Configuração│────▶│ Mensageria  │────▶│ API Zenn        │
│ Zenn        │     │             │     │ Discador        │
└─────────────┘     └─────────────┘     └─────────────────┘
       │                  │                     │
       │                  │                     │
       ▼                  ▼                     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ Importação  │     │ Envio de    │     │ Recebimento de  │
│ de Contatos │     │ Mensagens   │     │ Respostas       │
│             │     │             │     │                 │
└─────────────┘     └─────────────┘     └─────────────────┘
                                                │
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │                 │
                                        │ Interface       │
                                        │ WhatsApp        │
                                        │                 │
                                        └─────────────────┘
```

### 4.3. Fluxo de Dados do Banco de Dados

```
┌─────────────┐
│             │
│ MySQL       │
│ Database    │
│             │
└─────────────┘
       │
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                           Tabelas Principais                             │
│                                                                          │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐    │
│             │             │             │             │             │    │
│ Pacientes   │ Agendamentos│ Transações  │ Mensagens   │ Campanhas   │    │
│             │             │             │             │             │    │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
       │
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                           Tabelas de Configuração                        │
│                                                                          │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐    │
│             │             │             │             │             │    │
│ Usuários    │ Permissões  │ Config API  │ Templates   │ System      │    │
│             │             │             │             │ Config      │    │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## 5. Fluxo de Acesso via WhatsApp

O sistema Smart Zenn Digital permite que os pacientes acessem diversas funcionalidades diretamente pelo WhatsApp, sem necessidade de acessar o site:

```
┌─────────────┐
│             │
│ Paciente    │
│ (WhatsApp)  │
│             │
└─────────────┘
       │
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│             │     │             │     │                 │
│ API Zenn    │────▶│ Interpretação│────▶│ Roteamento      │
│ Discador    │     │ de Mensagem  │     │ de Solicitação  │
└─────────────┘     └─────────────┘     └─────────────────┘
                                                │
                                                │
           ┌───────────┬───────────┼───────────┬───────────┐
           │           │           │           │           │
           ▼           ▼           ▼           ▼           ▼
    ┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐
    │             ││             ││             ││             ││             │
    │Agendamentos ││ Consulta de ││ Pagamentos  ││ Informações ││ Atendimento │
    │             ││ Horários    ││             ││             ││ Humano      │
    └─────────────┘└─────────────┘└─────────────┘└─────────────┘└─────────────┘
           │           │           │           │           │
           │           │           │           │           │
           └───────────┴───────────┼───────────┴───────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │                 │
                          │ Resposta ao     │
                          │ Paciente        │
                          │                 │
                          └─────────────────┘
```

## 6. Conclusão

O sistema Smart Zenn Digital apresenta uma arquitetura modular e integrada, com fluxos bem definidos entre suas diferentes funcionalidades. A integração com APIs externas (PayGo e Zenn Discador) amplia significativamente as capacidades do sistema, permitindo processamento de pagamentos e comunicação eficiente com os pacientes.

O design centrado no usuário, inspirado no conceito de consultório odontológico com secretária 100% inteligência artificial, proporciona uma experiência moderna e tecnológica tanto para os administradores do sistema quanto para os pacientes que interagem com ele, seja pela interface web ou pelo WhatsApp.
