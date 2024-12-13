const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/employeeResolvers');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
mongoose.connect('mongodb+srv://ajitbehl02:ajit1997@ems-project.bqz23.mongodb.net/?retryWrites=true&w=majority&appName=ems-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  formatError: (err) => {
    console.error(err);
    return err;
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  app.listen({ port: 4010 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();