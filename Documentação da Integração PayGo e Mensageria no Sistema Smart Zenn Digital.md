# Documentação da Integração PayGo e Mensageria no Sistema Smart Zenn Digital

## Índice

1. [Introdução](#introdução)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Integração com API PayGo](#integração-com-api-paygo)
4. [Configuração das Chaves da API](#configuração-das-chaves-da-api)
5. [Geração de Pagamentos](#geração-de-pagamentos)
6. [Integração com Mensageria](#integração-com-mensageria)
7. [Importação de Contatos Excel](#importação-de-contatos-excel)
8. [Banco de Dados](#banco-de-dados)
9. [Testes e Validação](#testes-e-validação)
10. [Implantação](#implantação)
11. [Manutenção e Suporte](#manutenção-e-suporte)

## Introdução

Este documento descreve a implementação da integração entre o sistema de pagamentos PayGo e a plataforma de mensageria Zenn Digital no sistema Smart Zenn Digital. A integração permite a geração de pagamentos através da API PayGo e o envio desses pagamentos via mensageria utilizando a plataforma Discador Zenn Digital.

O sistema Smart Zenn Digital é uma solução completa para gestão de consultórios odontológicos, oferecendo funcionalidades como agendamento de consultas, gestão financeira, campanhas de marketing, mensageria e relatórios.

## Arquitetura do Sistema

A arquitetura do sistema é baseada em uma aplicação web com as seguintes tecnologias:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Banco de Dados**: MySQL
- **APIs Externas**: PayGo ControlPay, Discador Zenn Digital

A estrutura de diretórios do sistema é organizada da seguinte forma:

```
website_orthopride_deploy/
├── api/
│   ├── paygo_config.php
│   ├── payment_mensageria.php
│   └── ...
├── css/
│   ├── dashboard.css
│   ├── header.css
│   ├── styles.css
│   ├── zenn-colors.css
│   └── ...
├── database/
│   ├── db_config.php
│   ├── paygo_api.php
│   ├── zenn_discador_api.php
│   └── ...
├── img/
│   ├── logozenn.png
│   └── ...
├── js/
│   ├── main.js
│   └── ...
├── admin-dashboard.html
├── configuracoes-pagamento.html
├── geracao-pagamentos.html
├── index.html
├── mensageria.html
├── test_paygo_mensageria.sh
└── ...
```

## Integração com API PayGo

A integração com a API PayGo ControlPay foi implementada através da classe `PayGoAPI` que encapsula todas as funcionalidades necessárias para interagir com a API.

### Classe PayGoAPI

A classe `PayGoAPI` está localizada em `/database/paygo_api.php` e oferece os seguintes métodos:

- **Construtor**: Inicializa a classe com as credenciais fornecidas ou carrega das configurações do sistema
- **loadCredentials()**: Carrega as credenciais da API do banco de dados
- **saveCredentials()**: Salva as credenciais da API no banco de dados
- **hasCredentials()**: Verifica se as credenciais estão configuradas
- **getToken()**: Obtém um token de autenticação da API PayGo
- **processPayment()**: Processa um pagamento com cartão de crédito
- **generatePaymentLink()**: Gera um link de pagamento
- **generateBoleto()**: Gera um boleto bancário
- **getTransaction()**: Consulta uma transação existente
- **cancelTransaction()**: Cancela uma transação
- **testConnection()**: Testa a conexão com a API PayGo

### Endpoints da API PayGo

A API PayGo ControlPay oferece os seguintes endpoints principais:

- **/auth/token**: Autenticação e obtenção de token
- **/payment/process**: Processamento de pagamentos com cartão
- **/payment/link**: Geração de links de pagamento
- **/payment/boleto**: Geração de boletos
- **/payment/cancel**: Cancelamento de transações
- **/transactions/{id}**: Consulta de transações

## Configuração das Chaves da API

Foi implementada uma interface de configuração das chaves da API PayGo no painel do administrador, permitindo que o administrador insira as credenciais necessárias para a integração.

### Interface de Configuração

A interface de configuração está localizada em `/configuracoes-pagamento.html` e oferece os seguintes recursos:

- Campos para inserção do Client ID e Client Secret da API PayGo
- Seleção do ambiente (Sandbox ou Produção)
- Botão para testar a conexão com a API
- Botão para salvar as configurações
- Indicador visual do status da conexão
- Informações sobre os métodos de pagamento disponíveis
- Descrição dos recursos da integração

### API de Configuração

A API de configuração está localizada em `/api/paygo_config.php` e oferece os seguintes endpoints:

- **GET /api/paygo_config.php?action=get_config**: Obtém as configurações atuais
- **POST /api/paygo_config.php?action=save_config**: Salva novas configurações
- **POST /api/paygo_config.php?action=test_connection**: Testa a conexão com a API PayGo

## Geração de Pagamentos

Foi implementada uma interface para geração de pagamentos utilizando a API PayGo, permitindo a criação de diferentes tipos de pagamento.

### Interface de Geração de Pagamentos

A interface de geração de pagamentos está localizada em `/geracao-pagamentos.html` e oferece os seguintes recursos:

- **Link de Pagamento**: Gera um link que pode ser enviado ao cliente para pagamento
- **Boleto Bancário**: Gera um boleto bancário para pagamento
- **PIX**: Gera um código PIX para pagamento instantâneo
- **Cartão de Crédito**: Processa um pagamento com cartão de crédito
- **Histórico de Pagamentos**: Exibe um histórico dos pagamentos gerados

Cada método de pagamento possui um formulário específico com os campos necessários para a geração do pagamento, como dados do cliente, valor, descrição, etc.

### Funcionalidades de Pagamento

As principais funcionalidades implementadas para pagamentos são:

- Geração de links de pagamento com prazo de validade
- Geração de boletos com data de vencimento personalizada
- Geração de códigos PIX com QR Code
- Processamento de pagamentos com cartão de crédito, incluindo parcelamento
- Consulta de status de transações
- Cancelamento de transações
- Envio de comprovantes por e-mail ou WhatsApp

## Integração com Mensageria

Foi implementada a integração entre o sistema de pagamentos e a plataforma de mensageria Zenn Digital, permitindo o envio de pagamentos via WhatsApp.

### Classe ZennDiscadorAPI

A classe `ZennDiscadorAPI` está localizada em `/database/zenn_discador_api.php` e oferece os seguintes métodos:

- **Construtor**: Inicializa a classe com as credenciais fornecidas ou carrega das configurações do sistema
- **loadCredentials()**: Carrega as credenciais da API do banco de dados
- **saveCredentials()**: Salva as credenciais da API no banco de dados
- **hasCredentials()**: Verifica se as credenciais estão configuradas
- **getToken()**: Obtém um token de autenticação da API Zenn Discador
- **sendMessage()**: Envia uma mensagem de texto
- **sendMedia()**: Envia uma mídia (imagem, PDF, etc.)
- **importContacts()**: Importa contatos de um arquivo Excel
- **sendBulkMessage()**: Envia mensagens em massa para vários contatos
- **testConnection()**: Testa a conexão com a API Zenn Discador

### API de Integração PayGo-Mensageria

A API de integração entre PayGo e Mensageria está localizada em `/api/payment_mensageria.php` e oferece os seguintes endpoints:

- **POST /api/payment_mensageria.php?action=send_payment_link**: Envia um link de pagamento via mensageria
- **POST /api/payment_mensageria.php?action=send_boleto**: Envia um boleto via mensageria
- **POST /api/payment_mensageria.php?action=send_pix**: Envia um código PIX via mensageria
- **POST /api/payment_mensageria.php?action=send_receipt**: Envia um comprovante de pagamento via mensageria

## Importação de Contatos Excel

Foi implementada a funcionalidade de importação de contatos a partir de arquivos Excel para envio de mensagens em massa.

### Formato do Excel

O arquivo Excel deve conter duas colunas com os seguintes cabeçalhos:
- **nome**: Nome do contato
- **telefone**: Número de telefone do contato

### Processo de Importação

O processo de importação de contatos do Excel funciona da seguinte forma:

1. O usuário faz upload do arquivo Excel na interface de mensageria
2. O sistema valida o formato do arquivo e extrai os dados
3. Os contatos são exibidos em uma prévia para confirmação
4. Após a confirmação, os contatos são importados para a plataforma Zenn Discador
5. O usuário pode então enviar mensagens para os contatos importados

## Banco de Dados

O sistema utiliza um banco de dados MySQL para armazenar as informações necessárias para a integração.

### Tabelas

As principais tabelas utilizadas para a integração são:

- **system_config**: Armazena as configurações do sistema, incluindo as credenciais das APIs
- **mensageria_log**: Registra o histórico de mensagens enviadas
- **payment_transactions**: Registra as transações de pagamento

### Esquema do Banco de Dados

```sql
CREATE TABLE system_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE mensageria_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    destinatario VARCHAR(50) NOT NULL,
    conteudo TEXT,
    status VARCHAR(20) NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(100) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testes e Validação

Foi implementado um script de teste para validar a integração entre o sistema de pagamentos PayGo e a plataforma de mensageria Zenn Digital.

### Script de Teste

O script de teste está localizado em `/test_paygo_mensageria.sh` e realiza as seguintes verificações:

- Verifica a existência dos arquivos necessários
- Cria um banco de dados de teste
- Insere configurações de teste
- Testa a conexão com o banco de dados
- Testa a integração com a API PayGo
- Testa a integração com a API Zenn Discador
- Testa a integração entre PayGo e Mensageria
- Testa a importação de contatos do Excel

### Execução dos Testes

Para executar os testes, basta executar o script:

```bash
./test_paygo_mensageria.sh
```

## Implantação

O sistema está preparado para implantação em uma subinstância da AWS, com todas as integrações configuradas.

### Requisitos de Implantação

- Servidor web Apache ou Nginx
- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Extensões PHP: curl, json, mysqli, mbstring

### Processo de Implantação

1. Configurar o servidor web e o banco de dados
2. Fazer upload dos arquivos para o servidor
3. Criar o banco de dados e importar o esquema
4. Configurar as credenciais das APIs
5. Testar a integração

## Manutenção e Suporte

### Monitoramento

É recomendado monitorar regularmente os seguintes aspectos do sistema:

- Logs de erros do servidor web
- Logs de transações de pagamento
- Logs de envio de mensagens
- Desempenho do banco de dados

### Atualizações

As APIs externas podem ser atualizadas periodicamente, o que pode exigir ajustes no sistema. É importante acompanhar as atualizações das APIs PayGo e Zenn Discador.

### Suporte

Em caso de problemas com a integração, verifique:

1. As credenciais das APIs estão corretas
2. As APIs estão disponíveis e funcionando
3. Os logs de erro do sistema
4. A conexão com o banco de dados

Para suporte adicional, entre em contato com a equipe de desenvolvimento do sistema Smart Zenn Digital.
