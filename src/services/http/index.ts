// cache.interceptor
// error-handler.interceptor
// http-cache-service

import httpService from "./http-service";
import sessionInterceptor from "./session-interceptor";

httpService.addResponseInterceptor(
  sessionInterceptor.onFulfilled,
  sessionInterceptor.onRejected,
  "sessionResponseInterceptor"
);

export default httpService;
