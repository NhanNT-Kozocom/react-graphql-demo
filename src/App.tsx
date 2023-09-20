import React from "react";
import "./styles/root.scss";
import { Routers } from "./routes";
import { ApolloClientProvider } from "./providers";

function App() {
  return (
    <ApolloClientProvider>
      <Routers />
    </ApolloClientProvider>
  );
}

export default App;
