# Backend - GYMPOINT

> Retaguarda do Desafio 9 do Bootcamp da Rocketseat. Interface de comunicação web que frontend e mobile com o banco de dados da aplicação

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

No desafio proposto para o bootcamp é desenvolver um sistema capaz de administrar uma academia em algumas funções pré-determinada, dentre elas haviam: Usuários do Sistema (User), Sessões (Sessions) Estudantes(Students), Matrículas (Registrations), Planos (Plan), Pedidos de Ajuda (Help Orders) e Entradas (Checkins).

O sistema deve dar o suporte necessário para cadastrar, alterar, consultar e excluir as informações no sistema, além das regras de negócios de conhecimento popular e as de requisito específico.

Bibliotecas utilizadas para o desenvolvimento:

- "bcryptjs": "^2.4.3",
- "cors": "^2.8.5",
- "date-fns": "^2.0.0-beta.5",
- "express": "^4.17.1",
- "jsonwebtoken": "^8.5.1",
- "nodemailer": "^6.4.2",
- "pg": "^7.14.0",
- "pg-hstore": "^2.3.3",
- "sequelize": "^5.21.3",
- "yup": "^0.27.0"

![](../prints/backend_vscode.png)

## Instalação

OS X & Linux:

```sh
npm install my-crazy-module --save
```

Windows:

```sh
edit autoexec.bat
```

## Exemplo de uso

Alguns exemplos interessantes e úteis sobre como seu projeto pode ser utilizado. Adicione blocos de códigos e, se necessário, screenshots.

_Para mais exemplos, consulte a [Wiki][wiki]._

## Configuração para Desenvolvimento

Descreva como instalar todas as dependências para desenvolvimento e como rodar um test-suite automatizado de algum tipo. Se necessário, faça isso para múltiplas plataformas.

```sh
make install
npm test
```

## Histórico de lançamentos

- 0.2.1
  - MUDANÇA: Atualização de docs (código do módulo permanece inalterado)
- 0.2.0
  - MUDANÇA: Remove `setDefaultXYZ()`
  - ADD: Adiciona `init()`
- 0.1.1
  - CONSERTADO: Crash quando chama `baz()` (Obrigado @NomeDoContribuidorGeneroso!)
- 0.1.0
  - O primeiro lançamento adequado
  - MUDANÇA: Renomeia `foo()` para `bar()`
- 0.0.1
  - Trabalho em andamento

## Meta

Seu Nome – [@SeuNome](https://twitter.com/...) – SeuEmail@exemplo.com

Distribuído sob a licença XYZ. Veja `LICENSE` para mais informações.

[https://github.com/yourname/github-link](https://github.com/othonalberto/)

## Contributing

1. Faça o _fork_ do projeto (<https://github.com/yourname/yourproject/fork>)
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/fooBar`)
3. Faça o _commit_ (`git commit -am 'Add some fooBar'`)
4. _Push_ (`git push origin feature/fooBar`)
5. Crie um novo _Pull Request_

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/seunome/seuprojeto/wiki
