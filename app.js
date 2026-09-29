const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}
app.use(logger);

let usuarios = [];
let contas = [];
let categorias = [];
let lancamentos = [];

let idUsuario = 1;
let idConta = 1;
let idCategoria = 1;
let idLancamento = 1;

app.get('/', (req, res) => {
  res.send('API de Controle Financeiro no ar');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});