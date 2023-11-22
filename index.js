// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware de ejemplo
app.use((req, res, next) => {
  console.log('Middleware ejecutado');
  next();
});

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
