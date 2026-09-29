import express from 'express';
import { logger } from './middlewares/logger.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('API de Controle Financeiro no ar');
});

app.use('/usuarios', usuariosRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});