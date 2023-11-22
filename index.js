
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
//axios para manejar las consultas http
const axios = require('axios');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;

// Middleware 
app.use((req, res, next) => {
  console.log('Middleware ejecutado');
  next();
});

// Define el esquema GraphQL
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
    getAllCharacters: [Character]
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
        imageUrl: characterData.imageUrl,
      };
    } catch (error) {
      
      console.error('Error al hacer la solicitud a la API:', error.message);
      throw new Error('Error al obtener datos de la API');
    }
  },
  getAllCharacters: async () => {
    try {
      // Hacer una solicitud a la API para obtener todos los personajes
      const response = await axios.get('https://thronesapi.com/api/v2/Characters');

      // Estructurar los datos de respuesta en el formato del esquema GraphQL
      const charactersData = response.data;
      return charactersData.map(character => ({
        id: character.id,
        firstName: character.firstName,
        lastName: character.lastName,
        fullName: character.fullName,
        title: character.title,
        family: character.family,
        image: character.image,
        imageUrl: character.imageUrl,
      }));
    } catch (error) {
    
      console.error('Error al hacer la solicitud a la API:', error.message);
      throw new Error('Error al obtener datos de la API');
    }
  },
};

// Aqui se muestran los datos de la api por graphql si se necesita algun query hay un txt de ejemplo
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Habilita la interfaz de GraphiQL 
}));

// Ruta de ejemplo para mostrar todos los personajes
app.get('/characters', async (req, res) => {
  try {
    // Hacer una solicitud a la API para obtener todos los personajes
    const response = await axios.get('https://thronesapi.com/api/v2/Characters');

    // Estructurar los datos 
    const charactersData = response.data;
    const characterList = charactersData.map(character => ({
      id: character.id,
      fullName: character.fullName,
      title: character.title,
      imageUrl: character.imageUrl,
    }));
    res.json(characterList);
  } catch (error) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API' });
  }
});

// Iniciar el servidor e imprimir la URL aqui se muestran todos los datos de la api 
const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Servidor escuchando en http://localhost:${port}/characters`);
  
});
