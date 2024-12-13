import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4010/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(), // Caching mechanism
});

export { client };
