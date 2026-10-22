import { db } from '../data/db.js';

function encontrarCategoria(req) {
  const { id } = req.params;
  return db.categorias.find(c => c.id === parseInt(id) && c.usuarioId === req.usuario.id);
}

function limiteInvalido(limitePercentual) {
  return typeof limitePercentual !== 'number' || limitePercentual <= 0 || limitePercentual > 100;
}

export function criarCategoria(req, res) {
  const { nome, tipo, limitePercentual } = req.body || {};
  if (!nome || (tipo !== 'receita' && tipo !== 'despesa')) {
    return res.status(400).json({ erro: 'nome e tipo (receita ou despesa) são obrigatórios' });
  }
  if (limitePercentual !== undefined) {
    if (tipo !== 'despesa') {
      return res.status(400).json({ erro: 'Só categorias de despesa podem ter limite' });
    }
    if (limiteInvalido(limitePercentual)) {
      return res.status(400).json({ erro: 'limitePercentual deve ser um número entre 1 e 100' });
    }
  }
  const nova = {
    id: db.idCategoria,
    usuarioId: req.usuario.id,
    nome,
    tipo,
    limitePercentual: limitePercentual || null
  };
  db.idCategoria++;
  db.categorias.push(nova);
  res.status(201).json(nova);
}

export function listarCategorias(req, res) {
  const minhas = db.categorias.filter(c => c.usuarioId === req.usuario.id);
  res.json(minhas);
}

export function buscarCategoria(req, res) {
  const categoria = encontrarCategoria(req);
  if (!categoria) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }
  res.json(categoria);
}

export function atualizarCategoria(req, res) {
  const categoria = encontrarCategoria(req);
  if (!categoria) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }
  const { nome, limitePercentual } = req.body || {};
  if (limitePercentual !== undefined) {
    if (categoria.tipo !== 'despesa') {
      return res.status(400).json({ erro: 'Só categorias de despesa podem ter limite' });
    }
    if (limitePercentual !== null && limiteInvalido(limitePercentual)) {
      return res.status(400).json({ erro: 'limitePercentual deve ser um número entre 1 e 100 (ou null para remover)' });
    }
    categoria.limitePercentual = limitePercentual;
  }
  if (nome) {
    categoria.nome = nome;
  }
  res.json(categoria);
}

export function apagarCategoria(req, res) {
  const categoria = encontrarCategoria(req);
  if (!categoria) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }
  const emUso = db.lancamentos.find(l => l.categoriaId === categoria.id);
  if (emUso) {
    return res.status(400).json({ erro: 'A categoria possui lançamentos e não pode ser removida' });
  }
  db.categorias = db.categorias.filter(c => c.id !== categoria.id);
  res.json({ mensagem: 'Categoria removida' });
}