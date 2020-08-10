import { action } from "typesafe-actions";

export enum CoreActions {
  CHANGE_LOCALE = "@settings/CHANGE_LOCALE",
}

export const changeLocale = (locale: "en" | "fr") =>
  action(CoreActions.CHANGE_LOCALE, locale);
