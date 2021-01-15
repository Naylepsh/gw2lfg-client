import { HttpResponse } from "../httpResponse";

export interface HttpDeleteOptions {
  headers: any;
}

export type HttpDelete = <ResponseType>(
  url: string,
  config?: HttpDeleteOptions
) => Promise<HttpResponse<ResponseType>>;
