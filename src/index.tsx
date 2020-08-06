import * as React from "react";
import * as ReactDOM from "react-dom";

import store, { history } from "Store";

import { App } from "./app";

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById("root"));
};

if (process.env.NODE_ENV === "production") {
  renderRoot(<App store={store} history={history} />);
} else {
  const AppContainer = require("react-hot-loader").AppContainer;
  console.log({ App: new App(store, history).render() });
  renderRoot(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>
  );

  if (module.hot) {
    const AppContainer = require("react-hot-loader").AppContainer;

    module.hot.accept("./app", async () => {
      const NextApp = (await import("./app")).App;
      console.log({ NextApp });
      renderRoot(
        <AppContainer>
          <NextApp store={store} history={history} />
        </AppContainer>
      );
    });
  }
}
