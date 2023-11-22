// index.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware de ejemplo
app.use((req, res, next) => {
  console.log('Middleware ejecutado');
  next();
});

// Ruta para consumir la API "An API of Ice And Fire" y mostrar datos de un personaje
app.get('/got-character', async (req, res) => {
  try {
    // Hacer una solicitud a la API para obtener información sobre Tyrion Lannister
    const response = await axios.get('https://anapioficeandfire.com/api/characters/2');

    // Mostrar los datos en la respuesta
    res.json(response.data);
  } catch (error) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API' });
  }
});

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
