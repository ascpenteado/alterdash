import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpMethod } from "../types/api.types";
import { validateMD5Hash } from "../utils/validateMd5Hash";

export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string>) {
    this.axios = axios.create({
      timeout: 30000,
      headers,
      baseURL,
    });
  }

  public setAuthorizationHeader(token: string): void {
    if (validateMD5Hash(token)) {
      this.axios.defaults.headers.Authorization = token;
    }
  }

  private async request<ResponseType>(
    method: HttpMethod,
    url: string,
    params?: unknown,
    data?: unknown
  ): Promise<ResponseType> {
    if (!process.env.VUE_APP_BASE_URL) {
      return Promise.reject("Missing .env file or VUE_APP_BASE_URL field");
    }
    const optionalConfig: AxiosRequestConfig = {};

    if (params) {
      optionalConfig.params = params;
    }

    if (data) {
      optionalConfig.data = data;
    }

    const config = { method, url, ...optionalConfig };

    const resp = await this.axios.request<ResponseType>(config);
    return resp.data;
  }

  public get<ResponseType>(
    endpoint: string,
    params?: unknown
  ): Promise<ResponseType> {
    const config: AxiosRequestConfig = {
      params: params,
    };
    return this.request<ResponseType>(HttpMethod.GET, endpoint, undefined, {
      params: config.params,
    });
  }

  public post<ResponseType, PayloadType>(
    endpoint: string,
    data?: PayloadType
  ): Promise<ResponseType> {
    return this.request<ResponseType>(
      HttpMethod.POST,
      endpoint,
      undefined,
      data
    );
  }

  public put<ResponseType, PayloadType>(
    endpoint: string,
    data?: PayloadType
  ): Promise<ResponseType> {
    return this.request<ResponseType>(
      HttpMethod.PUT,
      endpoint,
      undefined,
      data
    );
  }
}

export const apiClient = new ApiClient(process.env.VUE_APP_BASE_URL, {
  "Content-Type": "application/json",
});
