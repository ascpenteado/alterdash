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

  private async request<ResponseType>(
    method: HttpMethod,
    url: string,
    params?: unknown,
    data?: unknown,
    headers?: HttpHeaders
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

    const config = { method, url, headers, ...optionalConfig };

    const resp = await this.axios.request<ResponseType>(config);
    return resp.data;
  }

  public get<ResponseType>(
    endpoint: string,
    params?: unknown,
    headers?: Record<string, string>
  ): Promise<ResponseType> {
    const config: AxiosRequestConfig = {
      params: params,
    };
    return this.request<ResponseType>(
      HttpMethod.GET,
      endpoint,
      undefined,
      {
        params: config.params,
      },
      headers
    );
  }

  public post<ResponseType, PayloadType>(
    endpoint: string,
    data?: PayloadType,
    headers?: Record<string, string>
  ): Promise<ResponseType> {
    return this.request<ResponseType>(
      HttpMethod.POST,
      endpoint,
      undefined,
      data,
      headers
    );
  }

  public put<ResponseType, PayloadType>(
    endpoint: string,
    data?: PayloadType,
    headers?: Record<string, string>
  ): Promise<ResponseType> {
    return this.request<ResponseType>(
      HttpMethod.PUT,
      endpoint,
      undefined,
      data,
      headers
    );
  }
}

export const apiClient = new ApiClient(process.env.VUE_APP_BASE_URL, {
  "Content-Type": "application/json",
});
