import axios from "axios";
import { HttpResponse } from "./httpResponse";

export interface HttpPutOptions {
  headers: any;
}

/* 
Wrapper around axios PUT method
On request success saves data to data field.
On requst failure saves error to error field
*/
export async function httpPut<DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPutOptions
): Promise<HttpResponse<ResponseType>> {
  try {
    const response = await axios.put<ResponseType>(url, data, config);
    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
}
