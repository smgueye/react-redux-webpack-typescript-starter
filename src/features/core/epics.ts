import { RootEpic } from "MyTypes";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { isActionOf } from "typesafe-actions";

import { loginUserAsync } from "./actions";

export const logUserEpic$: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loginUserAsync.request)),
    switchMap((payload) =>
      from(api.authentication.loginUser(payload)).pipe(
        map(loginUserAsync.success),
        catchError((error: any) => of(loginUserAsync.failure(error)))
      )
    )
  );
