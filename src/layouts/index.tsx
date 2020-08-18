import * as React from "react";
import { connect } from "react-redux";
import { Provider as I18nProvider } from "../lang/Provider";
import { getPath } from "../router-paths";
import { RootState } from "MyTypes";
import { Route, Redirect, Switch } from "react-router-dom";

import AuthView from "../views/AuthView";
import MainView from "../views/";

const mapStateToProps = ({ configs, router }: RootState) => {
  const { locale, loggedUser } = configs;
  return {
    locale,
    loggedUser,
    router,
  };
};

type Props = ReturnType<typeof mapStateToProps>;
type State = {};

type InitialPathType = {
  component: any; // TODO.
  loggedUser: any; // TODO.
  path: string;
};

const InitialPath = ({
  component: Component,
  loggedUser,
  ...rest
}: InitialPathType) => (
  <Route
    {...rest}
    render={(props) =>
      loggedUser && loggedUser.id ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: getPath("auth"),
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export class App extends React.Component<Props, State> {
  render() {
    const { locale, loggedUser } = this.props;

    return (
      <I18nProvider locale={locale}>
        <Switch>
          <InitialPath
            path={getPath("app")}
            loggedUser={loggedUser}
            component={MainView}
          />
          <Route exact={true} component={AuthView} path={getPath("auth")} />
          <Route path="**" render={() => <div>Page not found!</div>} />
        </Switch>
      </I18nProvider>
    );
  }
}

export default connect(mapStateToProps, {})(App);
