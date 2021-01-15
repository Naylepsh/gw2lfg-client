import { HttpResponse } from "../httpResponse";

export interface HttpPostOptions {
  headers: any;
}

export type HttpPost = <DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPostOptions
) => Promise<HttpResponse<ResponseType>>;
