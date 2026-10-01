import express from 'express';
import { identificarUsuario } from '../middlewares/identificarUsuario.js';
import { resumoMensal } from '../controllers/resumoController.js';

const router = express.Router();

router.get('/', identificarUsuario, resumoMensal);

export default router;