import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

// import articles from '../features/articles/reducer';
import configs from "../features/core/reducer";

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    configs,
  });

export default rootReducer;
