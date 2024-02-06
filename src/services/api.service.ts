import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

type HttpHeaders = { [key: string]: string };

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export class ApiClient {
  axios: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string>) {
    this.axios = axios.create({
      timeout: 30000,
      headers,
      baseURL,
    });
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    params?: unknown,
    data?: unknown,
    headers?: HttpHeaders
  ): Promise<T> {
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

    const config = { method, url, headers, ...optionalConfig };

    const resp = await this.axios.request<T>(config);
    return resp.data;
  }

  public get<T>(
    endpoint: string,
    params?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      params: params,
    };
    return this.request<T>(HttpMethod.GET, endpoint, undefined, {
      params: config.params,
      ...headers,
    });
  }

  public post<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(HttpMethod.POST, endpoint, undefined, data, headers);
  }

  public put<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(HttpMethod.PUT, endpoint, undefined, data, headers);
  }
}

export const apiClient = new ApiClient(process.env.VUE_APP_BASE_URL, {
  "Content-Type": "application/json",
});
