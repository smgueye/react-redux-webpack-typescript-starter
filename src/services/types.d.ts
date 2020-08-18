declare module "MyTypes" {
  export type Services = typeof import("./index").default;
}

declare module "ServiceTypes" {
  type CreateParamsType = {
    params?: { [key: string]: string | number };
    payload: { [key: string]: string | number };
    resource: string;
  };

  type GetParamsType = {
    id: number | string;
    params?: { [key: string]: string | number };
    resource: string;
  };

  type DeleteParamsType = {
    id: number | string;
    params?: { [key: string]: string | number };
    resource: string;
  };

  type ListParamsType = {
    params?: { [key: string]: string | number };
    resource: string;
  };

  type UpdateParamsType = {
    id: number | string;
    params?: { [key: string]: string | number };
    payload: { [key: string]: string | number };
    resource: string;
  };
}
