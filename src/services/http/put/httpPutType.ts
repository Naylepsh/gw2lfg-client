import { HttpResponse } from "../httpResponse";

export interface HttpPutOptions {
  headers: any;
}

export type HttpPut = <DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPutOptions
) => Promise<HttpResponse<ResponseType>>;
