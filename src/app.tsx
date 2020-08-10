import * as React from "react";

import { connect } from "react-redux";
import { Route } from "react-router-dom";

// CSS
import "./app.scss";

import { RootState } from "MyTypes";

import Home from "./views/Home";

import { Provider as I18nProvider } from "./lang/Provider";

import { getPath } from "./router-paths";

const mapStateToProps = ({ configs }: RootState) => {
  const { locale } = configs;
  return {
    locale,
  };
};
const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {};

export class App extends React.Component<Props, State> {
  render() {
    const { locale } = this.props;
    return (
      <I18nProvider locale={locale}>
        <Route exact={true} component={Home} path={getPath("home")} />
        <Route path="*" render={() => <div>Page not found!</div>} />
      </I18nProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
