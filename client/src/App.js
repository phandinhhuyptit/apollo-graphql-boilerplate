import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Routes from "./router/router";
import { StoreContext } from "./contexts/StoreContext";

import { AppWrapper } from "./theme/global.styled";
import loGet from "lodash/get";

function App() {
  const { state } = useContext(StoreContext);
  return (
    <AppWrapper theme={loGet(state, ["theme"])}>
      <div className="App">
        <React.Suspense fallback={<div> Loading.... </div>}>
          <Switch>
            {Routes.map(route => {
              return (
                <Route
                  path={route.path}
                  key={route.key}
                  exact={route.exact}
                  render={props => <route.component {...props} />}
                />
              );
            })}
          </Switch>
        </React.Suspense>
      </div>
    </AppWrapper>
  );
}

export default App;
