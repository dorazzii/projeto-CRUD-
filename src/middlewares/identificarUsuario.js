import { db } from '../data/db.js';

export function identificarUsuario(req, res, next) {
  const id = parseInt(req.headers['x-user-id']);
  const usuario = db.usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(400).json({ erro: 'Envie o header x-user-id com um usuário válido' });
  }
  req.usuario = usuario;
  next();
}