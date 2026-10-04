import { db } from '../data/db.js';

export function criarLancamento(req, res) {
  const { contaId, categoriaId, tipo, valor, data, descricao } = req.body;
  const novo = {
    id: db.idLancamento,
    usuarioId: req.usuario.id,
    contaId,
    categoriaId,
    tipo,
    valor,
    data,
    descricao: descricao || ''
  };
  db.idLancamento++;
  db.lancamentos.push(novo);
  res.status(201).json(novo);
}

export function listarLancamentos(req, res) {
  const { contaId, categoriaId, tipo, de, ate } = req.query;
  let lista = db.lancamentos.filter(l => l.usuarioId === req.usuario.id);

  if (contaId) {
    lista = lista.filter(l => l.contaId === parseInt(contaId));
  }
  if (categoriaId) {
    lista = lista.filter(l => l.categoriaId === parseInt(categoriaId));
  }
  if (tipo) {
    lista = lista.filter(l => l.tipo === tipo);
  }
  if (de) {
    lista = lista.filter(l => l.data >= de);
  }
  if (ate) {
    lista = lista.filter(l => l.data <= ate);
  }

  res.json(lista);
}

export function buscarLancamento(req, res) {
  const lancamento = db.lancamentos.find(
    l => l.id === parseInt(req.params.id) && l.usuarioId === req.usuario.id
  );
  if (!lancamento) {
    return res.status(404).json({ erro: 'Lançamento não encontrado' });
  }
  res.json(lancamento);
}

export function apagarLancamento(req, res) {
  const lancamento = db.lancamentos.find(
    l => l.id === parseInt(req.params.id) && l.usuarioId === req.usuario.id
  );
  if (!lancamento) {
    return res.status(404).json({ erro: 'Lançamento não encontrado' });
  }
  db.lancamentos = db.lancamentos.filter(l => l.id !== lancamento.id);
  res.json({ mensagem: 'Lançamento removido' });
}
