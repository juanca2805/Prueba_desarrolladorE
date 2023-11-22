// index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;

// Middleware de ejemplo
app.use((req, res, next) => {
  console.log('Middleware ejecutado');
  next();
});

// Definir el esquema GraphQL
const schema = buildSchema(`
  type Character {
    id: Int
    firstName: String
    lastName: String
    fullName: String
    title: String
    family: String
    image: String
    imageUrl: String
  }

  type Query {
    getCharacter(id: Int!): Character
  }
`);

// Resolver para la consulta
const root = {
  getCharacter: async ({ id }) => {
    try {
      // Hacer una solicitud a la API para obtener información sobre el personaje con el ID proporcionado
      const response = await axios.get(`https://thronesapi.com/api/v2/Characters/${id}`);

      // Estructurar los datos de respuesta en el formato del esquema GraphQL
      const characterData = response.data;
      return {
        id: characterData.id,
        firstName: characterData.firstName,
        lastName: characterData.lastName,
        fullName: characterData.fullName,
        title: characterData.title,
        family: characterData.family,
        image: characterData.image,
      
      };
    } catch (error) {
      // Manejar errores
      console.error('Error al hacer la solicitud a la API:', error.message);
      throw new Error('Error al obtener datos de la API');
    }
  },
};

// Ruta para GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Habilita la interfaz de GraphiQL para probar consultas
}));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
