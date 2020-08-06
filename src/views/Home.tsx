import * as React from "react";

import { connect } from "react-redux";

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
