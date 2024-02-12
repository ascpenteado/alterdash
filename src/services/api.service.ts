import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpMethod, RequestArgs } from "../types/api.types";
export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string>) {
    if (!baseURL) throw new Error("Missing baseURL");

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
}

export const apiClient = new ApiClient(process.env.VUE_APP_API_BASE_URL, {
  "Content-Type": "application/json",
});
