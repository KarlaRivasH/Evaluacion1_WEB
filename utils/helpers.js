function limpiar(texto) {
    return texto.trim();
}

function esCadenaValida(valor) {
    return typeof valor === "string" && limpiar(valor).length > 0;
}

function normalizarTexto(texto) {
    const limpio = limpiar(texto).toLowerCase();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

// Verifica que el estado sea uno de los permitidos
function estadoValido(estado) {
  const estadosValidos = ["Pendiente", "En Proceso", "Resuelta", "Cancelada"];
  return estadosValidos.includes(estado);
}

module.exports = {
  esCadenaValida,
  limpiar,
  estadoValido,
  normalizarTexto,
};