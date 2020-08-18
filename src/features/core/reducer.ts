import { combineReducers } from "redux";

import { createReducer, ActionType } from "typesafe-actions";

import httpService from "../../services/http";
import * as actions from "./actions";
import { LoggedUser } from "Models";

type CoreActionTypes = ActionType<typeof actions>;

const localReducer = createReducer("fr" as any).handleAction(
  actions.CoreActions.CHANGE_LOCALE as any,
  (state: any, action: CoreActionTypes | any) => action.payload
);

const isLogingUserReduder = createReducer(false as boolean)
  .handleAction(actions.loginUserAsync.request as any, (state, action) => true)
  .handleAction(
    [actions.loginUserAsync.success, actions.loginUserAsync.failure] as any,
    (state, action) => false
  );

const loggedUserReducer = createReducer({} as LoggedUser | any)
  .handleAction(
    actions.loginUserAsync.success as any,
    (state, action: CoreActionTypes | any) => {
      const { token, user } = (action.payload as any).data;

      httpService.token = token;

      return { ...user, token };
    }
  )
  .handleAction(
    actions.loginUserAsync.failure as any,
    (state: any, action: any) => ({ error: action.payload })
  );

const reducer = combineReducers({
  isLogingUser: isLogingUserReduder,
  locale: localReducer,
  loggedUser: loggedUserReducer,
});

export default reducer;
