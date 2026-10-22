import express from 'express';
import { identificarUsuario } from '../middlewares/identificarUsuario.js';
import { validarLancamento } from '../middlewares/validarLancamento.js';
import { verificarReservaMinima } from '../middlewares/verificarReservaMinima.js';
import { verificarLimiteCategoria } from '../middlewares/verificarLimiteCategoria.js';
import {
  criarLancamento,
  listarLancamentos,
  buscarLancamento,
  apagarLancamento
} from '../controllers/lancamentosController.js';

const router = express.Router();

router.post(
  '/',
  identificarUsuario,
  validarLancamento,
  verificarReservaMinima,
  verificarLimiteCategoria,
  criarLancamento
);
router.get('/', identificarUsuario, listarLancamentos);
router.get('/:id', identificarUsuario, buscarLancamento);
router.delete('/:id', identificarUsuario, apagarLancamento);

export default router;
