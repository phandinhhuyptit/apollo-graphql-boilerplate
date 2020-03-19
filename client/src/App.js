import React from "react";
import { Switch, Route } from "react-router-dom";
import Routes from "./router/router";

function App() {
  return (
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

      {/* <BookContextProvider>
       
      </BookContextProvider> */}
    </div>
  );
}

export default App;
