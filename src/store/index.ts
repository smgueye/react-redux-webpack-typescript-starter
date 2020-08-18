import { RootAction, RootState, Services } from "MyTypes";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistReducer, persistStore } from "redux-persist";

import { composeEnhancers } from "./utils";
import rootReducer, { persistConfig } from "./root-reducer";
import rootEpic from "./root-epic";
import services from "Services";

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

// configure middlewares
export const history = createBrowserHistory();
const middlewares = [routerMiddleware(history), epicMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const persistedReducer = persistReducer(persistConfig, rootReducer(history));
const store = createStore(persistedReducer, initialState, enhancer);

export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
