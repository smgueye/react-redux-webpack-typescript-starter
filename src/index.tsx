import * as React from "react";
import * as ReactDOM from "react-dom";

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

import store, {
  history,
  // epicMiddleware
} from "Store";

import App from "./app";

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById("root"));
};

const mainApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

if (process.env.NODE_ENV === "production") {
  renderRoot(mainApp());
} else {
  const AppContainer = require("react-hot-loader").AppContainer;

  renderRoot(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <App />
        </AppContainer>
      </ConnectedRouter>
    </Provider>
  );

  if (module.hot) {
    const AppContainer = require("react-hot-loader").AppContainer;

    module.hot.accept("./app", async () => {
      const NextApp = (await import("./app")).default;

      renderRoot(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <AppContainer>
              <NextApp />
            </AppContainer>
          </ConnectedRouter>
        </Provider>
      );
    });

    // reducers
    module.hot.accept("./store/root-reducer", () => {
      const newRootReducer = require("./store/root-reducer").default;
      store.replaceReducer(newRootReducer);
    });

    // epics
    // module.hot.accept("./store/root-epic", () => {
    //   const newRootEpic = require("./store/root-epic").default;
    //   store.replaceEpic(newRootEpic); // To confirm.
    // });
  }
}
