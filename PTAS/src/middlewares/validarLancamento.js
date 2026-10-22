import { db } from '../data/db.js';

export function validarLancamento(req, res, next) {
  const { contaId, categoriaId, tipo, valor, data } = req.body || {};

  if (contaId === undefined || categoriaId === undefined || !tipo || valor === undefined || !data) {
    return res.status(400).json({ erro: 'contaId, categoriaId, tipo, valor e data são obrigatórios' });
  }

  const conta = db.contas.find(c => c.id === contaId && c.usuarioId === req.usuario.id);
  if (!conta) {
    return res.status(400).json({ erro: 'Conta não encontrada' });
  }

  const categoria = db.categorias.find(c => c.id === categoriaId && c.usuarioId === req.usuario.id);
  if (!categoria) {
    return res.status(400).json({ erro: 'Categoria não encontrada' });
  }

  if (tipo !== 'receita' && tipo !== 'despesa') {
    return res.status(400).json({ erro: 'tipo deve ser receita ou despesa' });
  }

  if (tipo !== categoria.tipo) {
    return res.status(400).json({ erro: 'O tipo do lançamento deve ser igual ao tipo da categoria' });
  }

  if (typeof valor !== 'number' || !(valor > 0)) {
    return res.status(400).json({ erro: 'valor deve ser um número maior que zero' });
  }

  const dataValida = typeof data === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(data)
    && !Number.isNaN(new Date(data).getTime())
    && new Date(data).toISOString().slice(0, 10) === data;
  if (!dataValida) {
    return res.status(400).json({ erro: 'data deve estar no formato AAAA-MM-DD' });
  }

  next();
}
