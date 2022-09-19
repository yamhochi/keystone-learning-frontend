import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";

// const client = new ApolloClient({
//   uri: process.env.CONNECT_URI,
//   // uri: "http://localhost:3000/api/graphql",
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.CONNECT_URI,
    credentials: 'same-origin',
    // headers: {
    //   cookie: request.header('Cookie'),
    // },
  }),
  cache: new InMemoryCache(),
});

export default client;
