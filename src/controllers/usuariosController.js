import { db } from '../data/db.js';

export function criarUsuario(req, res) {
  const { nome, email } = req.body || {};
  if (!nome || !email) {
    return res.status(400).json({ erro: 'nome e email são obrigatórios' });
  }
  const novo = { id: db.idUsuario, nome, email };
  db.idUsuario++;
  db.usuarios.push(novo);
  res.status(201).json(novo);
}

export function listarUsuarios(req, res) {
  res.json(db.usuarios);
}

export function buscarUsuario(req, res) {
  const { id } = req.params;
  const usuario = db.usuarios.find(u => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.json(usuario);
}