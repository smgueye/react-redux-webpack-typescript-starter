import * as React from "react";

import { connect } from "react-redux";

import { changeLocale, loginUserAsync } from "Features/core/actions";
import { getConfigs } from "Features/core/selectors";
import { translate } from "Lang";
import { RootState } from "MyTypes";

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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          maxime et soluta iure veritatis officiis dolorum nam, ipsum
          consequatur iusto accusantium pariatur nisi tenetur nostrum molestiae,
          voluptates maiores qui consectetur.
        </p>
      </div>
    );
  }

  changeLocale = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.changeLocale(event.currentTarget.dataset.langId as "en" | "fr");
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
