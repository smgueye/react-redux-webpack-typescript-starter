import * as React from "react";

import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";

// CSS
import "./app.scss";

// Views
import Home from "./views/Home";

// Modules
import Services from "Services";

// Helpers
import { getPath } from "./router-paths";

interface Props {
  store: any;
  history: History;
}

const { I18n } = Services;
const { Provider: I18nProvider, Locales } = I18n;

export class App extends React.Component<Props, {}> {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <I18nProvider locale={Locales.FRENCH}>
          <ConnectedRouter history={history}>
            <Route exact={true} component={Home} path={getPath("home")} />
            <Route path="*" render={() => <div>Page not found!</div>} />
          </ConnectedRouter>
        </I18nProvider>
      </Provider>
    );
  }
}
