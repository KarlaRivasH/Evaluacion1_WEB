const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();
const port = 3124;

app.use(express.json());
app.use('/incidencias', incidenciasRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});