const { esCadenaValida, esPrioridadValida, estadoValido } = require('../utils/helpers');

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
    if (!esCadenaValida(prioridad) || !esPrioridadValida(prioridad)) {
        return res.status(400).json({ mensaje: "La prioridad debe ser Alta, Media o Baja" });
    }


    const nuevaIncidencia = {
        id: siguienteId,
        empleado: normalizarTexto(empleado),
        area: normalizarTexto(area),
        descripcion: limpiar(descripcion),
        prioridad: normalizarTexto(prioridad),
        estado: 'Pendiente'   // regla de negocio: toda incidencia nueva nace Pendiente
    };

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

const deleteIncidencia = (req, res) => {
    const id = Number(req.params.id);
    const incidenciaIndex = incidencias.findIndex(inc => inc.id === id);

    if (incidenciaIndex === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    incidencias.splice(incidenciaIndex, 1);
    res.status(200).json({ mensaje: "Incidencia eliminada" });
};

const clasificarIncidenciaAutomatica = (req, res) => {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ mensaje: "El id debe ser un número" });
    }

    const incidencia = incidencias.find(inc => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion;

    switch (incidencia.prioridad) {
        case 'Alta':
            clasificacion = 'Crítica';
            break;
        case 'Media':
            clasificacion = 'Importante';
            break;
        case 'Baja':
            clasificacion = 'Normal';
            break;
        default:
            clasificacion = 'Sin clasificacion definida';
    }

    res.status(200).json({ id: incidencia.id, clasificacion });
};

module.exports = {
    createIncidencia,
    getIncidencias,
    getIncidenciaById,
    deleteIncidencia,
    clasificarIncidenciaAutomatica
};