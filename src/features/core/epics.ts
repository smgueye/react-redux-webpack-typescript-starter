import { RootEpic } from "MyTypes";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { isActionOf } from "typesafe-actions";

import { loginUserAsync, userRedirected } from "./actions";
import { AxiosResponse } from "axios";
import { getPath } from "../../router-paths";

export const logUserEpic$: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loginUserAsync.request)),
    switchMap(({ payload }) =>
      from(api.authentication.loginUser(payload)).pipe(
        map((response: AxiosResponse) => {
          const { history } = payload;
          return loginUserAsync.success({ ...response, history });
        }),
        catchError((error: any) => of(loginUserAsync.failure(error)))
      )
    )
  );

export const logUserSuccessEpic$: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loginUserAsync.success)),
    map(({ payload }) => {
      const { history } = payload as any; // TODO.
      (history as any).push(getPath("app"));
      return userRedirected();
    })
  );
