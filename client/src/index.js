import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { HOST_SERVER, SOCKET_SERVER } from "./configs/conection";
import { GlobalStyle } from "./theme/global.styled";
import StoreProvider from "./contexts/StoreContext";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { split, from } from "apollo-link";

const httpLink = new HttpLink({
  uri: `http://localhost:9005/kompaql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:9005/kompaql`,
  options: {
    reconnect: true,
  },
});

const cache = new InMemoryCache();

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: from([link]),
  cache,
  connectToDevTools: true,
});



const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
