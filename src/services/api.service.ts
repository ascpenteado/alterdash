import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpMethod, RequestArgs } from "../types/api.types";
export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string>) {
    this.axios = axios.create({
      timeout: 30000,
      headers,
      baseURL,
    });
  }

  private async request<ResponseType>(
    args: RequestArgs,
    method: HttpMethod
  ): Promise<ResponseType> {
    if (!process.env.VUE_APP_BASE_URL) {
      return Promise.reject("Missing .env file or VUE_APP_BASE_URL field");
    }
    const optionalConfig: AxiosRequestConfig = { ...args, method };

    const resp = await this.axios.request<ResponseType>(optionalConfig);
    return resp.data;
  }

  public get<ResponseType>(requestArgs: RequestArgs): Promise<ResponseType> {
    return this.request<ResponseType>(requestArgs, HttpMethod.GET);
  }
  public post<ResponseType, PayloadType>(
    requestArgs: RequestArgs<PayloadType>
  ): Promise<ResponseType> {
    const payload = requestArgs.data as PayloadType;
    const args: RequestArgs = {
      ...requestArgs,
      data: payload,
    };
    return this.request<ResponseType>(args, HttpMethod.POST);
  }
  public put<ResponseType, PayloadType>(
    requestArgs: RequestArgs<PayloadType>
  ): Promise<ResponseType> {
    const payload = requestArgs.data as PayloadType;
    const args: RequestArgs = {
      ...requestArgs,
      data: payload,
    };
    return this.request<ResponseType>(args, HttpMethod.PUT);
  }
  public delete<ResponseType>(requestArgs: RequestArgs): Promise<ResponseType> {
    return this.request<ResponseType>(requestArgs, HttpMethod.DELETE);
  }

  // public post<ResponseType, PayloadType>(
  //   endpoint: string,
  //   data?: PayloadType
  // ): Promise<ResponseType> {
  //   return this.request<ResponseType>(
  //     HttpMethod.POST,
  //     endpoint,
  //     undefined,
  //     data
  //   );
  // }

  // public put<ResponseType, PayloadType>(
  //   endpoint: string,
  //   data?: PayloadType
  // ): Promise<ResponseType> {
  //   return this.request<ResponseType>(
  //     HttpMethod.PUT,
  //     endpoint,
  //     undefined,
  //     data
  //   );
  // }

  // public delete<ResponseType>(
  //   endpoint: string,
  //   params?: unknown
  // ): Promise<ResponseType> {
  //   const config: AxiosRequestConfig = {
  //     params: params,
  //   };
  //   return this.request<ResponseType>(HttpMethod.DELETE, endpoint, undefined, {
  //     params: config.params,
  //   });
  // }
}

export const apiClient = new ApiClient(process.env.VUE_APP_BASE_URL, {
  "Content-Type": "application/json",
});
