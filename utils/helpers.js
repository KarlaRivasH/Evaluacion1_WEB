function limpiar(texto) {
    return texto.trim();
}

function esCadenaValida(valor) {
    return typeof valor === "string" && limpiar(valor).length > 0;
}


// Verifica que el estado sea uno de los permitidos
function estadoValido(estado) {
  const estadosValidos = ["Pendiente", "En Proceso", "Resuelta", "Cancelada"];
  return estadosValidos.includes(estado);
}
function esPrioridadValida(prioridad) {
    const esPrioridadValida = ["Alta", "Media", "Baja"];
  return esPrioridadValida.includes(prioridad);
}

module.exports = {
  esCadenaValida,
  limpiar,
  estadoValido,
  esPrioridadValida,
};