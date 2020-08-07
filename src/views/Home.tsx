import * as React from "react";

import { connect } from "react-redux";

import Services from "Services";
import { RootState } from "MyTypes";

const { I18n } = Services;
const { translate } = I18n;

const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {};
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {};

export class Home extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>Home {translate("hello")} </h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
