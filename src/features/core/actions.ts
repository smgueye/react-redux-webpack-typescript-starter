import { action, createAsyncAction } from "typesafe-actions";

import { AxiosResponse, AxiosError } from "axios";
import { LocalesType } from "Models";

export enum CoreActions {
  CHANGE_LOCALE = "@settings/CHANGE_LOCALE",
  LOGOUT_USER = "@settings/LOGOUT_USER",
  REDIRECT_USER = "@settings/LOGOUT_USER",
  LOGIN_USER_REQUEST = "@settings/LOGIN_USER_REQUEST",
  LOGIN_USER_SUCCESS = "@settings/LOGOUT_USER_SUCCESS",
  LOGIN_USER_FAILURE = "@settings/LOGOUT_USER_FAILURE",
}

export const changeLocale = (locale: LocalesType) =>
  action(CoreActions.CHANGE_LOCALE, locale);

export const loginUserAsync = createAsyncAction(
  CoreActions.LOGIN_USER_REQUEST,
  CoreActions.LOGIN_USER_SUCCESS,
  CoreActions.LOGIN_USER_FAILURE
)<
  { username: string; password: string; history: History },
  AxiosResponse<any> | any,
  AxiosError
>();

export const logoutUser = () => action(CoreActions.LOGOUT_USER);

export const userRedirected = () => action(CoreActions.REDIRECT_USER);
