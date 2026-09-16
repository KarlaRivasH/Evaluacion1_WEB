// Verifica que el valor sea un string no vacio (usa trim())
function esCadenaValida(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function limpiar(texto) {
    return texto.trim();
}

function esPrioridadValida(prioridad) {
    const prioridadesPermitidas = ['Alta', 'Media', 'Baja'];
    return prioridadesPermitidas.includes(prioridad);
}

function normalizarTexto(texto) {
  const limpio = texto.trim().toLowerCase();
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
  esPrioridadValida,
  estadoValido,
  normalizarTexto,
};