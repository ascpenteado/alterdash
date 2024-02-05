import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  isAxiosError,
  AxiosError,
} from "axios";

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
    params?: any,
    data?: any,
    headers?: HttpHeaders
  ): Promise<T> {
    if (!process.env.VUE_APP_BASE_URL) {
      return Promise.reject("Missing .env file or API_BASE_URL field");
    }
    const optionalConfig: AxiosRequestConfig = {};

    if (params) {
      optionalConfig.params = params;
    }

    if (data) {
      optionalConfig.data = data;
    }

    const config = { method, url, headers, ...optionalConfig };

    try {
      const resp = await this.axios.request<T>(config);
      return resp.data;
    } catch (error) {
      const axiosErr = isAxiosError(error);
      if (axiosErr) {
        console.log((error as AxiosError).config?.baseURL);
      }
      throw new Error(error as unknown as string);
    }
  }

  public get<T>(
    endpoint: string,
    params?: any,
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
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(HttpMethod.POST, endpoint, undefined, data, headers);
  }

  public put<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(HttpMethod.PUT, endpoint, undefined, data, headers);
  }
}

export const apiClient = new ApiClient(process.env.VUE_APP_BASE_URL, {
  "Content-Type": "application/json",
});
