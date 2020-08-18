import * as React from "react";
import {
  Switch,
  Route, //Redirect
} from "react-router-dom";
import { getPath } from "../router-paths";

import HomeView from "./HomeView";
import AboutView from "./AboutView";

export class MainView extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path={getPath("home")} component={HomeView} />
          <Route path={getPath("about")} component={AboutView} />
        </Switch>
      </div>
    );
  }
}

export default MainView;
