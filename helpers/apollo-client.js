import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";

export function createApolloClient() {
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });

  return client;
}
