import express from 'express';
import { criarUsuario, listarUsuarios, buscarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuario);

export default router;