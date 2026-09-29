const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}
app.use(logger);

app.get('/', (req, res) => {
  res.send('API de Controle Financeiro no ar');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});