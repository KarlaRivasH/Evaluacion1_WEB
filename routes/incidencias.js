const express = require('express');
const routes = express.Router();

const { createIncidencia,
    getIncidencias,
    getIncidenciaById,
    cambiarEstado,
    deleteIncidencia,
   // getEstadisticas,
    clasificarIncidenciaAutomatica 
   } = require('../controllers/incidenciascontroller');

routes.post('/', createIncidencia);
routes.get('/', getIncidencias);
routes.get('/:id', getIncidenciaById);
routes.put('/:id/estado', cambiarEstado);
routes.delete('/:id', deleteIncidencia);   
//routes.get('/estadisticas', getEstadisticas);
routes.get('/:id/clasificacion', clasificarIncidenciaAutomatica);

module.exports = routes;