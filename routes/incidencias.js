const express = require('express');
const routes = express.Router();

const { createIncidencia,
    getIncidencias,
    getEstadisticas,
    getIncidenciaById,
    cambiarEstado,
    deleteIncidencia,
    clasificarIncidenciaAutomatica 
   } = require('../controllers/incidenciascontroller');

routes.post('/', createIncidencia);
routes.get('/', getIncidencias);
routes.get('/estadisticas', getEstadisticas);
routes.get('/:id', getIncidenciaById);
routes.put('/:id/estado', cambiarEstado);
routes.delete('/:id', deleteIncidencia);   
routes.get('/:id/clasificacion', clasificarIncidenciaAutomatica);

module.exports = routes;