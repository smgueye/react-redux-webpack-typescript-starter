import httpService from "../services/http";

type LoginPayloadType = {};

export const loginUser = (payload: LoginPayloadType | any) => {
  return httpService.List({ resource: "/login.json" });
};
