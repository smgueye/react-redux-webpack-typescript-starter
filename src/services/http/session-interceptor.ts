import { AxiosResponse } from "axios";

function onFulfilled(response: AxiosResponse<any>) {
  return response;
}

function onRejected(error: any) {
  if (error.response.status != 401 && error.response.status != 403)
    return Promise.reject(error);

  localStorage.removeItem("saara-admin:session");
  window.location.href = "/sign_in";
}

export default {
  onFulfilled,
  onRejected,
};
