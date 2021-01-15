import axios from "axios";
import { HttpResponse } from "../httpResponse";
import { HttpPut, HttpPutOptions } from "./httpPutType";

/* 
Wrapper around axios PUT method
On request success saves data to data field.
On requst failure saves error to error field
*/
export const axiosHttpPutAdapter: HttpPut = async function <
  DataType,
  ResponseType
>(
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
};
