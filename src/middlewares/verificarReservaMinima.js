import { db } from '../data/db.js';

export function verificarReservaMinima(req, res, next) {
  const { tipo, valor, data } = req.body;

  if (tipo !== 'despesa') {
    return next();
  }

  const mes = data.substring(0, 7);
  const doMes = db.lancamentos.filter(l => l.usuarioId === req.usuario.id && l.data.startsWith(mes));

  let receitas = 0;
  let despesas = 0;
  for (const l of doMes) {
    if (l.tipo === 'receita') {
      receitas = receitas + l.valor;
    } else {
      despesas = despesas + l.valor;
    }
  }

  if (receitas === 0) {
    return res.status(400).json({ erro: 'Não há receita registrada neste mês para lançar despesas' });
  }

  const maximo = receitas * 0.8;
  if (despesas + valor > maximo + 1e-9) {
    return res.status(400).json({
      erro: 'Reserva mínima de 20% da receita do mês não seria respeitada'
    });
  }

  next();
}
