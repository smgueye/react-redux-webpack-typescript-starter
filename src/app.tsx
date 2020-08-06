import * as React from "react";

import "./app.scss";

import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";

import { getPath } from "./router-paths";
import Home from "./views/Home";

interface Props {
  store: any;
  history: History;
}

export class App extends React.Component<Props, {}> {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact={true} component={Home} path={getPath("home")} />
          <Route render={() => <div>Page not found!</div>} />
        </ConnectedRouter>
      </Provider>
    );
  }
}
