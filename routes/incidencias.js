const express = require('express');
const routes = express.Router();

const { createIncidencia,
    getIncidencias,
    getIncidenciaById
   // updateEstadoIncidencia,
   // deleteIncidencia,
   // getEstadisticas,
    //clasificarIncidenciaAutomatica 
   } = require('../controllers/incidenciascontroller');

routes.post('/', createIncidencia);
routes.get('/', getIncidencias);
routes.get('/:id', getIncidenciaById);
//routes.put('/:id/estado', updateEstadoIncidencia);
//routes.delete('/:id', deleteIncidencia);   
//routes.get('/estadisticas', getEstadisticas);
//routes.get('/:id/clasificacion', clasificarIncidenciaAutomatica);

module.exports = routes;