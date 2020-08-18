import * as React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { history, persistor } from "Store";

// CSS
import "./app.scss";

import Container from "./layouts";

export const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Container />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
