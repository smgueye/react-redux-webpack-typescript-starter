import * as React from "react";

import { connect } from "react-redux";

import { translate } from "Lang";
import { RootState } from "MyTypes";
import { loginUserAsync } from "Features/core/actions";
import { getConfigs } from "Features/core/selectors";
import { history } from "Store";

const mapStateToProps = (state: RootState) => ({
  configs: getConfigs(state),
  history: history,
});
const mapDispatchToProps = {
  loginUser: loginUserAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {};

export class AuthView extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>{translate("auth.title")} </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          maxime et soluta iure veritatis officiis dolorum nam, ipsum
          consequatur iusto accusantium pariatur nisi tenetur nostrum molestiae,
          voluptates maiores qui consectetur.
        </p>
        <button onClick={this.requestLogin.bind(this)}>Login</button>
      </div>
    );
  }

  requestLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    this.props.loginUser({
      username: "smgueye@performancesgroup.com",
      password: "admin123",
      history: history as any,
    });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
