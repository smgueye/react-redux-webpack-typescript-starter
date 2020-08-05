import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./app";

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById("root"));
};

if (process.env.NODE_ENV === "production") {
  renderRoot(<App />);
} else {
  const AppContainer = require("react-hot-loader").AppContainer;
  renderRoot(
    <AppContainer>
      <App />
    </AppContainer>
  );

  if (module.hot) {
    const AppContainer = require("react-hot-loader").AppContainer;

    module.hot.accept("./app", async () => {
      const NextApp = (await import("./app")).App;
      renderRoot(
        <AppContainer>
          <NextApp />
        </AppContainer>
      );
    });
  }
}
