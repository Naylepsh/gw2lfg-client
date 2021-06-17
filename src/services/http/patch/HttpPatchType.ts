import { HttpResponse } from "../httpResponse";
import { HttpPutOptions } from "../put/httpPutType";

export interface HttpPatchOptions {
  headers: any;
}

export type HttpPatch = <DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPutOptions
) => Promise<HttpResponse<ResponseType>>;
