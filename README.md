# API de Controle Financeiro Pessoal

Trabalho de Programação e Técnicas para Aplicações Servidor 3.

**Equipe:** Rafael de Almeida Souza Rodrigues e Henrique Dorazzi dos Reis

**Tema:** Controle financeiro pessoal

## Problema

Saber para onde o dinheiro está indo. Muita gente se surpreende ao somar, no fim do mês, quanto gasta em delivery ou assinaturas. Sem registro, o dinheiro simplesmente "some".

## Como rodar

    npm install
    npm run dev

O servidor sobe em http://localhost:3000.

## Identificação do usuário

Não há login. As rotas de contas, categorias e lançamentos exigem o header `x-user-id` com o id de um usuário criado em `POST /usuarios`.

## Regras de negócio

1. Limite de gastos por categoria: cada categoria de despesa pode ter um limite em percentual da receita do mês (por exemplo, lazer no máximo 10%).
2. Reserva mínima: as despesas do mês não podem passar de 80% da receita, garantindo no mínimo 20% de reserva.

