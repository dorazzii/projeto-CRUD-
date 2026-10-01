import { db } from '../data/db.js';

export function resumoMensal(req, res) {
  const { mes } = req.query;
  if (!mes || mes.length !== 7) {
    return res.status(400).json({ erro: 'Informe mes no formato AAAA-MM' });
  }

  const doMes = db.lancamentos.filter(l => l.usuarioId === req.usuario.id && l.data.includes(mes));

  let receitas = 0;
  let despesas = 0;
  const despesasPorCategoria = {};
  for (const l of doMes) {
    if (l.tipo === 'receita') {
      receitas = receitas + l.valor;
    } else {
      despesas = despesas + l.valor;
      const categoria = db.categorias.find(c => c.id === l.categoriaId);
      const nome = categoria ? categoria.nome : 'Sem categoria';
      despesasPorCategoria[nome] = (despesasPorCategoria[nome] || 0) + l.valor;
    }
  }

  const reservado = receitas - despesas;
  res.json({
    mes,
    receitas,
    despesas,
    reservado,
    percentualReservado: receitas ? (reservado / receitas) * 100 : 0,
    despesasPorCategoria
  });
}