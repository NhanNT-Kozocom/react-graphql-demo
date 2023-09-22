import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface IProps {
  children?: React.ReactNode;
}

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }: IProps) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
