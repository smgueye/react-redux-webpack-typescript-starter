import * as logger from "./logger-service";
import * as articles from "./articles-api-client";
import * as toast from "./toast-service";
import * as localStorage from "./local-storage-service";
import * as I18n from "./i18n-service";

export default {
  I18n,
  logger,
  localStorage,
  toast,
  api: {
    articles,
  },
};
