import { combineReducers } from "redux";

import { createReducer } from "typesafe-actions";

import { CoreActions } from "./actions";

const reducer = combineReducers({
  locale: createReducer("fr" as any).handleAction(
    CoreActions.CHANGE_LOCALE as any,
    (_: any, action: any) => action.payload
  ),
});

export default reducer;
