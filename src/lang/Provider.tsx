import * as React from "react";

import { IntlProvider, FormattedMessage } from "react-intl";

import AppLocale from "./index";

type I18nProviderType = {
  children: JSX.Element[];
  locale: "en" | "fr";
};

export const translate = (id: string, value = {}) => (
  <FormattedMessage id={id} values={{ ...value }} />
);

export const Provider: React.FC<I18nProviderType> = ({
  children,
  locale = "en",
}) => {
  const currentAppLocal = AppLocale[locale];
  return (
    <IntlProvider
      locale={locale}
      textComponent={React.Fragment}
      messages={currentAppLocal.messages}
    >
      {children}
    </IntlProvider>
  );
};
