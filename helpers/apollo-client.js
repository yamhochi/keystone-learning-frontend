import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    // fetchPolicy: "cache-and-network",
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    // fetchPolicy: "network-only",
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export function createApolloClient() {
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      // credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
    defaultOptions,
  });

  return client;
}
