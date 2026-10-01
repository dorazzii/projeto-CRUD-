# API de Controle Financeiro Pessoal

Trabalho de Programação e Técnicas para Aplicações Servidor 3.

**Equipe:** Rafael de Almeida Souza Rodrigues e Henrique Dorazzi dos Reis

**Tema:** Controle financeiro pessoal

## Problema

Saber para onde o dinheiro está indo. Muita gente se surpreende ao somar, no fim do mês, quanto gasta em delivery ou assinaturas. Sem registro, o dinheiro simplesmente "some".

## Como rodar

    npm install
    npm run dev

O servidor sobe em http://localhost:3000. Os dados ficam em memória e são apagados quando o servidor reinicia.

## Estrutura

    src/
      app.js          configura o Express e sobe o servidor
      data/           dados em memória
      middlewares/    logger e identificação do usuário
      controllers/    o que cada rota faz
      routes/         qual URL chama qual função

## Identificação do usuário

Não há login. As rotas de contas, categorias e lançamentos exigem o header `x-user-id` com o id de um usuário criado em `POST /usuarios`. Cada usuário só enxerga os próprios dados. Sem o header, ou com um id inexistente, a resposta é:

    Erro 400: { "erro": "Envie o header x-user-id com um usuário válido" }

## Regras de negócio

1. **Limite de gastos por categoria:** cada categoria de despesa pode ter um limite, em percentual da receita do mês (por exemplo, lazer no máximo 10%). Uma despesa que faria a categoria passar desse limite é recusada.
2. **Reserva mínima:** as despesas do mês não podem passar de 80% da receita, garantindo no mínimo 20% de reserva.

## Endpoints

### Usuários

**POST /usuarios** cria um usuário.

    Corpo: { "nome": "Henrique", "email": "h@email.com" }
    Resposta 201: { "id": 1, "nome": "Henrique", "email": "h@email.com" }
    Erro 400: { "erro": "nome e email são obrigatórios" }

**GET /usuarios** lista os usuários.

    Resposta 200: [ { "id": 1, "nome": "Henrique", "email": "h@email.com" } ]

**GET /usuarios/:id** busca um usuário.

    Resposta 200: { "id": 1, "nome": "Henrique", "email": "h@email.com" }
    Erro 404: { "erro": "Usuário não encontrado" }

### Categorias

Todas as rotas de categorias exigem o header `x-user-id` e só enxergam as categorias do próprio usuário. O tipo da categoria é `receita` ou `despesa`. Só categorias de despesa podem ter `limitePercentual`, um número de 1 a 100 que representa o máximo da receita do mês que a categoria pode consumir.

**POST /categorias** cria uma categoria.

    Corpo: { "nome": "Lazer", "tipo": "despesa", "limitePercentual": 10 }
    Resposta 201: { "id": 1, "usuarioId": 1, "nome": "Lazer", "tipo": "despesa", "limitePercentual": 10 }
    Erro 400: { "erro": "Só categorias de despesa podem ter limite" }

**GET /categorias** lista as categorias do usuário.

    Resposta 200: [ { "id": 1, "usuarioId": 1, "nome": "Lazer", "tipo": "despesa", "limitePercentual": 10 } ]

**GET /categorias/:id** busca uma categoria.

    Resposta 200: { "id": 1, "usuarioId": 1, "nome": "Lazer", "tipo": "despesa", "limitePercentual": 10 }
    Erro 404: { "erro": "Categoria não encontrada" }

**PUT /categorias/:id** atualiza nome e/ou limite. Enviar `"limitePercentual": null` remove o limite.

    Corpo: { "limitePercentual": 15 }
    Resposta 200: { "id": 1, "usuarioId": 1, "nome": "Lazer", "tipo": "despesa", "limitePercentual": 15 }

**DELETE /categorias/:id** remove a categoria, desde que ela não tenha lançamentos.

    Resposta 200: { "mensagem": "Categoria removida" }
    Erro 400: { "erro": "A categoria possui lançamentos e não pode ser removida" }

