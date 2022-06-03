<hr>
<h1 align="center">fieldservices-dashboard</h1>
<p align=center><i align="center">Aplicação de Gerenciamento de Equipe e Processos de Suporte de Infraestrutura de TI</i></p>
<div align="center">

<a href="">[![Total alerts](https://img.shields.io/lgtm/alerts/g/DexDevLab/fieldservices-dashboard.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/DexDevLab/fieldservices-dashboard/alerts/)</a>
<a href="">[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/DexDevLab/fieldservices-dashboard.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/DexDevLab/fieldservices-dashboard/context:javascript)</a>
<a href="">[![Code Size](https://img.shields.io/github/languages/code-size/DexDevLab/fieldservices-dashboard)](https://github.com/DexDevLab/fieldservices-dashboard)</a>
<a href="">[![Repo Size](https://img.shields.io/github/repo-size/DexDevLab/fieldservices-dashboard)](https://github.com/DexDevLab/fieldservices-dashboard)</a>

<a href="">[![Last Commit](https://img.shields.io/github/last-commit/DexDevLab/fieldservices-dashboard)](https://github.com/DexDevLab/fieldservices-dashboard/) </a>
<a href="">![Version](https://img.shields.io/badge/version-1.0.0-005bff) </a>
<a href="">[![license](https://img.shields.io/github/license/DexDevLab/fieldservices-dashboard)](https://github.com/DexDevLab/fieldservices-dashboard/LICENSE)</a>

</div>
<hr>

## Conteúdo

- [Objetivo](#objetivo)
- [Características](#características)
- [Stack](#stack)
- [Notas de versão](#notas-de-versão)
- [Como usar este repositório](#como-usar-este-repositório)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Autores](#autores)
- [Contato](#contato)
- [Licença](#licença)

<hr>

## Objetivo

Muitos administradores de equipe de suporte não possuem um controle eficaz do estoque de componentes e peças, tampouco um controle de entrada e retirada de equipamentos baseado em tickets de um sistema ITSM. Ainda, poucas equipes possuem uma verificação eficaz de softwares, arquivos e demais dados do usuário antes da formatação, além de não ter nenhum validador automático. A ideia central é criar uma plataforma de gerenciamento de checkups, controles, processos, procedimentos e outros aspectos de gestão de equipe de suporte, além de ferramentas e funcionalidades úteis a técnicos.

<hr>

## Características

- Aplicação Serverless, com fácil implantação, acesso via qualquer navegador dentro da rede local onde a aplicação está implantada
- Baixos requerimentos e especificações necessárias para execução
- Centralização e organização das funções através de menu lateral
- Controle de usuários e níveis de acesso com registro em Banco de Dados
- Intuitivo e fácil de operar, com informações à disposição
- Formulários preenchidos são enviados por email com versão em PDF

<hr>

## Stack

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Framework de Banco de Dados:** [Prisma.io](https://www.prisma.io)
- **Banco de Dados:** [SQLite](https://www.sqlite.org/index.html)
- **Gerenciador de Bibliotecas:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/DexDevLab/fieldservices-dashboard/blob/master/package.json).

<hr>

## Notas de versão

Para ver as notas de versão, clique [aqui](https://github.com/DexDevLab/fieldservices-dashboard/blob/master/CHANGELOG.md).

<hr>

## Como usar este repositório

### Utilizando como projeto

#### 1 - Realize um git clone deste repositório para seu repositório local

```bash
git clone https://github.com/DexDevLab/fieldservices-dashboard
```

#### 2 - Instale o yarn, inicialize-o, e rode o projeto

```bash
npm install yarn -g
$ yarn
$ yarn dev
```

A aplicação estará executando normalmente em localhost:3000 como default.

<br>

### Variáveis de Ambiente

#### Arquivo .env

| Variável                 | Uso  |
| ------------------- | -------|
|`DATABASE_URL=`          | define o caminho do arquivo de banco de dados SQLite |

#### Arquivo .env.local

| Variável                 | Uso  |
| ------------------- | -------|
|`JWT_SECRET=`          | define uma chave criptográfica de 32 caracteres necessária para descriptografar e validar a autenticação do JWT |
|`NEXTAUTH_URL=`          | endereço base da aplicação (caso publicado na web). Padrão: "http://localhost:3000" |
|`ADMIN_USER=`          | nome de usuário da conta padrão utilizada para testes |
|`ADMIN_PASSWORD=`       | senha da conta padrão utilizada para testes |
|`ADMIN_LEVEL=`       | nível de acesso da conta padrão utilizada para testes (padrão: 2) |
|`LOGGER_TO_CONSOLE=`       | define se o utilitário de log irá emitir uma mensagem a nível console ou não (valores: "true" ou "false") |
|`MAIN_TRANSITION_TIMEOUT=`  | tempo padrão para a animação de transição padrão das páginas, em milisegundos (padrão: 200) |

<br>

<hr>

## Autores

<a href="https://github.com/DexDevLab/fieldservices-dashboard/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DexDevLab/fieldservices-dashboard" />
</a>

<hr>

## Contato

Se você gostou desse projeto, me dê uma <a href="https://github.com/DexDevLab/fieldservices-dashboard" data-icon="octicon-star" aria-label="Star DexDevLab/fieldservices-dashboard on GitHub">estrela</a>.
<br>
Para contato, envie um email a: <a href="mailto:dex.houshi@hotmail.com">dex.houshi@hotmail.com</a>

<hr>

## Licença

Licenciado sob a [MIT License](https://github.com/DexDevLab/fieldservices-dashboard/blob/master/LICENSE).
