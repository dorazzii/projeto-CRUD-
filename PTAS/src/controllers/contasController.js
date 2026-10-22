import { db } from '../data/db.js';

function encontrarConta(req) {
  const { id } = req.params;
  return db.contas.find(c => c.id === parseInt(id) && c.usuarioId === req.usuario.id);
}

export function criarConta(req, res) {
  const { nome, saldoInicial } = req.body || {};
  if (!nome) {
    return res.status(400).json({ erro: 'nome é obrigatório' });
  }
  if (saldoInicial !== undefined && typeof saldoInicial !== 'number') {
    return res.status(400).json({ erro: 'saldoInicial deve ser um número' });
  }
  const nova = {
    id: db.idConta,
    usuarioId: req.usuario.id,
    nome,
    saldoInicial: saldoInicial || 0
  };
  db.idConta++;
  db.contas.push(nova);
  res.status(201).json(nova);
}

export function listarContas(req, res) {
  const minhas = db.contas.filter(c => c.usuarioId === req.usuario.id);
  res.json(minhas);
}

export function buscarConta(req, res) {
  const conta = encontrarConta(req);
  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }
  res.json(conta);
}

export function atualizarConta(req, res) {
  const conta = encontrarConta(req);
  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }
  const { nome, saldoInicial } = req.body || {};
  if (saldoInicial !== undefined && typeof saldoInicial !== 'number') {
    return res.status(400).json({ erro: 'saldoInicial deve ser um número' });
  }
  if (nome) {
    conta.nome = nome;
  }
  if (saldoInicial !== undefined) {
    conta.saldoInicial = saldoInicial;
  }
  res.json(conta);
}

export function apagarConta(req, res) {
  const conta = encontrarConta(req);
  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }
  const emUso = db.lancamentos.find(l => l.contaId === conta.id);
  if (emUso) {
    return res.status(400).json({ erro: 'A conta possui lançamentos e não pode ser removida' });
  }
  db.contas = db.contas.filter(c => c.id !== conta.id);
  res.json({ mensagem: 'Conta removida' });
}

export function saldoDaConta(req, res) {
  const conta = encontrarConta(req);
  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }
  let saldo = conta.saldoInicial;
  const daConta = db.lancamentos.filter(l => l.contaId === conta.id);
  for (const l of daConta) {
    if (l.tipo === 'receita') {
      saldo = saldo + l.valor;
    } else {
      saldo = saldo - l.valor;
    }
  }
  res.json({ contaId: conta.id, saldo });
}

export function extratoDaConta(req, res) {
  const conta = encontrarConta(req);
  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }
  const { de, ate } = req.query;
  if (!de || !ate) {
    return res.status(400).json({ erro: 'Informe de e ate no formato AAAA-MM-DD' });
  }
  const extrato = db.lancamentos.filter(l => l.contaId === conta.id && l.data >= de && l.data <= ate);
  res.json({ contaId: conta.id, de, ate, lancamentos: extrato });
}