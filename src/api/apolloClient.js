import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// Cliente de GraphQL; MSW responde en esta dirección
// Se usa HttpLink en vez de la opción "uri" porque Apollo 3.14 la marca como obsoleta
export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${import.meta.env.BASE_URL}graphql` }),
  cache: new InMemoryCache(),
})
