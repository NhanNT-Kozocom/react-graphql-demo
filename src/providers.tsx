import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface IProps {
  children?: React.ReactNode;
}

const apolloClient = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }: IProps) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
