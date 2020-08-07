import * as React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";

import Services from "Services";
import messages from "Locales";

export enum Locales {
  ARABIC = "AR",
  DEUTCH = "de-DE",
  ENGLISH = "en-US",
  FRENCH = "fr-FR",
}

type I18nProviderType = {
  children: React.Component;
  locale: string;
};

export const setLocale = (locale: string) => {
  const { localStorage } = Services;
  localStorage.set("locale", locale);
};

export const getLocal = () => {
  const { localStorage } = Services;
  return localStorage.get("locale") || Locales.ENGLISH;
};

export const translate = (id: string, value = {}) => (
  <FormattedMessage id={id} values={{ ...value }} />
);

export const Provider = ({ children, locale = Locales.ENGLISH }: any) => (
  <IntlProvider
    locale={locale}
    textComponent={React.Fragment}
    messages={(messages as any)[locale]}
  >
    {children}
  </IntlProvider>
);
