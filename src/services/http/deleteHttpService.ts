import axios from "axios";
import { HttpResponse } from "./httpResponse";

export interface HttpDeleteOptions {
  headers: any;
}

/* 
Wrapper around axios delete method.
On request success saves data to data field.
On requst failure saves error to error field
*/
export async function httpDelete<ResponseType>(
  url: string,
  config?: HttpDeleteOptions
): Promise<HttpResponse<ResponseType>> {
  try {
    const response = await axios.delete<ResponseType>(url, config);
    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
}
