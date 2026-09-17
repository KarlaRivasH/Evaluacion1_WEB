const { esCadenaValida, esPrioridadValida, limpiar } = require('../utils/helpers');

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
        empleado: limpiar(empleado),
        area: limpiar(area),
        descripcion: limpiar(descripcion),
        prioridad: limpiar(prioridad),
        estado: 'Pendiente'   // regla de negocio: toda incidencia nueva nace Pendiente
    };

    incidencias.push(nuevaIncidencia);
    siguienteId++;

    return res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
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

const cambiarEstado = (req, res) => {

    const id = Number(req.params.id);
    const { estado } = req.body;

    const incidencia = incidencias.find(
        incidencia => incidencia.id === id
    );

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    switch (estado) {

        case "Pendiente":
            incidencia.estado = estado;
            break;

        case "En Proceso":
            incidencia.estado = estado;
            break;

        case "Resuelta":
            incidencia.estado = estado;
            break;

            case "Cancelada":
            incidencia.estado = estado;
            break;

        default:
            return res.status(400).json({
                mensaje: "Estado inválido"
            });
    }

    res.json({
        mensaje: "Estado actualizado correctamente",
        incidencia
    });
};

const getEstadisticas = (req, res) => {
    // Un solo recorrido: reduce agrupa y cuenta por estado
    const conteo = incidencias.reduce((acumulador, inc) => {
        acumulador[inc.estado] = (acumulador[inc.estado] || 0) + 1;
        return acumulador;
    }, {});

    return res.status(200).json({
        totalIncidencias: incidencias.length,
        pendientes: conteo['Pendiente'] || 0,
        enProceso: conteo['En Proceso'] || 0,
        resueltas: conteo['Resuelta'] || 0,
        canceladas: conteo['Cancelada'] || 0
    });
};



module.exports = {
    createIncidencia,
    getIncidencias,
    getIncidenciaById,
    deleteIncidencia,
    clasificarIncidenciaAutomatica,
    cambiarEstado,
    getEstadisticas
};