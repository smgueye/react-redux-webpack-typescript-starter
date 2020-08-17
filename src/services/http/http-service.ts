import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

import {
  CreateParamsType,
  DeleteParamsType,
  GetParamsType,
  ListParamsType,
  UpdateParamsType,
} from "ServiceTypes";

export class HttpService {
  private _client: AxiosInstance;
  private _responseInterceptors: {
    [interceptorName: string]: number;
  } = {};
  private _requestInterceptors: {
    [interceptorName: string]: number;
  } = {};
  private _sessionNamespace: string = "saara-admin:session";

  constructor() {
    this._client = axios.create({
      baseURL: process.env.BASE_URL,
      headers: {
        common: {
          Authorization: `JWT ${this.token}`,
        },
      },
    });
  }

  /**
   */
  get client(): AxiosInstance {
    return this._client;
  }

  /**
   */
  get token(): string {
    let session = localStorage.getItem(this._sessionNamespace);

    if (!session) session = '{"token": null}';

    const { token } = JSON.parse(session);
    return token;
  }

  /**
   *
   * @param onFulfilled
   * @param onRejected
   * @param interceptorName
   */
  addResponseInterceptor(
    onFulfilled: (value: AxiosResponse<any>) => AxiosResponse<any>,
    onRejected: (error: any) => void,
    interceptorName: string
  ) {
    const interceptorId = this.client.interceptors.response.use(
      onFulfilled,
      onRejected
    );
    this._responseInterceptors[interceptorName] = interceptorId;
  }

  /**
   *
   * @param onFulfilled
   * @param onRejected
   * @param interceptorName
   */
  addRequestInterceptor(
    onFulfilled: (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected: (error: any) => void,
    interceptorName: string
  ) {
    const interceptorId = this.client.interceptors.request.use(
      onFulfilled,
      onRejected
    );
    this._requestInterceptors[interceptorName] = interceptorId;
  }

  /**
   *
   * @param interceptorName
   */
  removeResponseInterceptor(interceptorName: string) {
    const interceptorId = this._responseInterceptors[interceptorName];
    if (!interceptorId) return;

    this.client.interceptors.response.eject(interceptorId);
    delete this._responseInterceptors[interceptorName];
  }

  /**
   *
   * @param interceptorName
   */
  removeRequestInterceptor(interceptorName: string) {
    const interceptorId = this._requestInterceptors[interceptorName];
    if (!interceptorId) return;

    this.client.interceptors.response.eject(interceptorId);
    delete this._requestInterceptors[interceptorName];
  }

  /**
   */
  Create({
    resource,
    params,
    payload,
  }: CreateParamsType): Promise<AxiosResponse> {
    return this._client.put(resource, payload, {
      params,
    });
  }

  /**
   */
  Delete({ id, params, resource }: DeleteParamsType): Promise<AxiosResponse> {
    return this._client.delete(resource.replace(/:id/, String(id)), { params });
  }

  /**
   */
  Get({ id, params, resource }: GetParamsType): Promise<AxiosResponse> {
    return this._client.get(resource.replace(/:id/, String(id)), { params });
  }

  /**
   */
  List({ params, resource }: ListParamsType): Promise<AxiosResponse> {
    return this._client.get(resource, { params });
  }

  /**
   */
  Update({
    id,
    params,
    payload,
    resource,
  }: UpdateParamsType): Promise<AxiosResponse> {
    return this._client.put(resource.replace(/:id/, String(id)), payload, {
      params,
    });
  }

  /**
   */
  UpdateOrCreate(params: UpdateParamsType | CreateParamsType) {
    return (params as UpdateParamsType).id
      ? this.Update(params as UpdateParamsType)
      : this.Create(params);
  }
}

export default new HttpService();
