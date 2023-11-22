// index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;

// Middleware de ejemplo
app.use((req, res, next) => {
  console.log('Middleware ejecutado');
  next();
});

// Ruta de ejemplo con GraphQL
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const root = {
  message: () => '¡Hola, mundo desde GraphQL!',
};

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
