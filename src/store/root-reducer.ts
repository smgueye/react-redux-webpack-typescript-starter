import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import storage from "redux-persist/lib/storage";

// import articles from '../features/articles/reducer';
import configs from "../features/core/reducer";

export const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router"],
  whitelist: ["configs"],
};

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    configs,
  });

export default rootReducer;
