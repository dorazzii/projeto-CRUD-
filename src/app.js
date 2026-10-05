import express from 'express';
import { logger } from './middlewares/logger.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import resumoRoutes from './routes/resumoRoutes.js';
import contasRoutes from './routes/contasRoutes.js';
import lancamentosRoutes from './routes/lancamentosRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('API de Controle Financeiro no ar');
});

app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/resumo', resumoRoutes);
app.use('/contas', contasRoutes);
app.use('/lancamentos', lancamentosRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});