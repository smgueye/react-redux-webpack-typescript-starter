import * as logger from "./logger-service";
import * as articles from "./articles-api-client";
import * as authentication from "./auth-service";
import * as toast from "./toast-service";
import * as localStorage from "./local-storage-service";

export default {
  logger,
  localStorage,
  toast,
  api: {
    articles,
    authentication,
  },
};
