import * as React from "react";

import { connect } from "react-redux";

import { translate } from "Lang";
import { RootState } from "MyTypes";
import { changeLocale, loginUserAsync } from "Features/core/actions";
import { getConfigs } from "Features/core/selectors";

const mapStateToProps = (state: RootState) => ({
  configs: getConfigs(state),
});
const mapDispatchToProps = {
  changeLocale,
  loginUser: loginUserAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {};

export class Home extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>Home {translate("hello")} </h1>
        <button data-lang-id="en" onClick={this.changeLocale.bind(this)}>
          Change Locale To EN
        </button>
        <button data-lang-id="fr" onClick={this.changeLocale.bind(this)}>
          Change Locale To FR
        </button>
        <a href="#" onClick={this.requestLogin.bind(this)}>
          Login user test
        </a>
      </div>
    );
  }

  changeLocale = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.changeLocale(event.currentTarget.dataset.langId as "en" | "fr");
  };

  requestLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    this.props.loginUser({ email: "mgueye.io", password: "sdn" });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
