import express from 'express';
import { identificarUsuario } from '../middlewares/identificarUsuario.js';
import {
  criarConta,
  listarContas,
  buscarConta,
  atualizarConta,
  apagarConta,
  saldoDaConta,
  extratoDaConta
} from '../controllers/contasController.js';

const router = express.Router();

router.post('/', identificarUsuario, criarConta);
router.get('/', identificarUsuario, listarContas);
router.get('/:id', identificarUsuario, buscarConta);
router.put('/:id', identificarUsuario, atualizarConta);
router.delete('/:id', identificarUsuario, apagarConta);
router.get('/:id/saldo', identificarUsuario, saldoDaConta);
router.get('/:id/extrato', identificarUsuario, extratoDaConta);

export default router;