import { db } from '../data/db.js';

export function verificarLimiteCategoria(req, res, next) {
  const { tipo, valor, data, categoriaId } = req.body;

  
  if (tipo !== 'despesa') {
    return next();
  }

  const categoria = db.categorias.find(c => c.id === categoriaId);
  if (!categoria || !categoria.limitePercentual) {
    return next();
  }

  
  const mes = data.substring(0, 7);
  const doMes = db.lancamentos.filter(l => l.usuarioId === req.usuario.id && l.data.includes(mes));

  let receitas = 0;
  let gastoNaCategoria = 0;
  for (const l of doMes) {
    if (l.tipo === 'receita') {
      receitas = receitas + l.valor;
    } else if (l.categoriaId === categoriaId) {
      gastoNaCategoria = gastoNaCategoria + l.valor;
    }
  }

  if (receitas === 0) {
    return res.status(400).json({ erro: 'Não há receita registrada neste mês para aplicar o limite da categoria' });
  }

  const limite = (receitas * categoria.limitePercentual) / 100;
  if (gastoNaCategoria + valor > limite) {
    return res.status(400).json({
      erro: `Limite da categoria ${categoria.nome} excedido (máximo ${categoria.limitePercentual}% da receita do mês)`
    });
  }

  next();
}