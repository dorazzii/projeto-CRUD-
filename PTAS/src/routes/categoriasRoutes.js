import express from 'express';
import { identificarUsuario } from '../middlewares/identificarUsuario.js';
import {
  criarCategoria,
  listarCategorias,
  buscarCategoria,
  atualizarCategoria,
  apagarCategoria
} from '../controllers/categoriasController.js';

const router = express.Router();

router.post('/', identificarUsuario, criarCategoria);
router.get('/', identificarUsuario, listarCategorias);
router.get('/:id', identificarUsuario, buscarCategoria);
router.put('/:id', identificarUsuario, atualizarCategoria);
router.delete('/:id', identificarUsuario, apagarCategoria);

export default router;