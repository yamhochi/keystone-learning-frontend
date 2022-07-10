import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:3000/api/graphql",
  uri: process.env.CONNECT_URI,
  cache: new InMemoryCache(),
});

export default client;

