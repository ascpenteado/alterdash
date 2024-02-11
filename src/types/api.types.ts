export type HttpHeaders = { [key: string]: string };

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type ApiError = {
  message: string;
};

export type RequestArgs<PayloadType = unknown> = {
  url: string;
  headers?: HttpHeaders;
  params?: Record<string, string>;
  data?: PayloadType;
};
