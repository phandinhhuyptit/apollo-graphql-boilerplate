import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { hostServer } from "./configs/conection";
import { GlobalStyle } from "./theme/global.styled";
import StoreProvider from "./contexts/StoreContext";

const client = new ApolloClient({
  uri: `${hostServer}/kompaql`
});

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <Router history={history}>
        <App />
      </Router>
    </StoreProvider>
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
