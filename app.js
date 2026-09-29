import express from 'express';
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

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body || {};
  if (!nome || !email) {
    return res.status(400).json({ erro: 'nome e email são obrigatórios' });
  }
  const novo = { id: idUsuario, nome, email };
  idUsuario++;
  usuarios.push(novo);
  res.status(201).json(novo);
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.json(usuario);
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});