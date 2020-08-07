import * as React from "react";
import * as ReactDOM from "react-dom";

import store, { history, epicMiddleware } from "Store";

import { App } from "./app";

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById("root"));
};

if (process.env.NODE_ENV === "production") {
  renderRoot(<App store={store} history={history} />);
} else {
  const AppContainer = require("react-hot-loader").AppContainer;

  renderRoot(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>
  );

  if (module.hot) {
    const AppContainer = require("react-hot-loader").AppContainer;

    module.hot.accept("./app", async () => {
      const NextApp = (await import("./app")).App;

      renderRoot(
        <AppContainer>
          <NextApp store={store} history={history} />
        </AppContainer>
      );
    });

    // reducers
    module.hot.accept("./store/root-reducer", () => {
      const newRootReducer = require("./store/root-reducer").default;
      store.replaceReducer(newRootReducer);
    });

    // epics
    module.hot.accept("./store/root-epic", () => {
      const newRootEpic = require("./store/root-epic").default;
      store.replaceEpic(newRootEpic); // To confirm.
    });
  }
}
