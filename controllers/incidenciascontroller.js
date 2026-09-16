const { esCadenaValida, esPrioridadValida, normalizarTexto, estadoValido } = require('../utils/helpers');

const incidencias = [];
let siguienteId = 1;


const createIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    //validaciones 
    if (!esCadenaValida(empleado)) {
        return res.status(400).json({ mensaje: "El nombre del empleado es inválido" });
    }
    if (!esCadenaValida(area)) {
        return res.status(400).json({ mensaje: "El área es inválida" });
    }
    if (!esCadenaValida(descripcion)) {
        return res.status(400).json({ mensaje: "La descripción es inválida" });
    }
    if (!esPrioridadValida(prioridad)) {
        return res.status(400).json({ mensaje: "La prioridad es inválida" });
    }

    const estado = 'Pendiente'; // Estado inicial de la incidencia (regla de negocio: todas las incidencias comienzan como "Pendiente")

    const nuevaIncidencia = {
        id: siguienteId,
        empleado,
        area,
        descripcion,
        prioridad,
        estado
    };

    //validando estado y prioridad
    if (!estadoValido(estado)) {
        return res.status(400).json({ mensaje: "El estado es inválido" });
    }

    if (!esPrioridadValida(prioridad)) {
        return res.status(400).json({ mensaje: "La prioridad es inválida" });
    }


    incidencias.push(nuevaIncidencia);
    siguienteId++;

    res.status(201).json(nuevaIncidencia);
}


const getIncidencias = (req, res) => {
    res.json(incidencias);
}

const getIncidenciaById = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensaje: "El id debe ser un número" });
    }

    const incidencia = incidencias.find(inc => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    return res.status(200).json(incidencia);
};

module.exports = {
    createIncidencia,
    getIncidencias,
    getIncidenciaById
};