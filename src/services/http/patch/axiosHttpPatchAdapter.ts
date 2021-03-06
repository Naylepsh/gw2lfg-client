import axios, { AxiosResponse } from "axios";
import { handleRequestError } from "../handleRequestError";
import { HttpResponse } from "../httpResponse";
import { HttpPut, HttpPutOptions } from "../put/httpPutType";

/**
 * Wrapper around axios PATCH method
 * On request success saves data to data field.
 * On requst failure saves error to error field
 */
export const axiosHttpPatchAdapter: HttpPut = async function <
  DataType,
  ResponseType
>(
  url: string,
  data: DataType,
  config?: HttpPutOptions
): Promise<HttpResponse<ResponseType>> {
  try {
    const response = await axios.patch<ResponseType>(url, data, config);
    return { data: response.data };
  } catch (error) {
    handleRequestError(error.response as AxiosResponse);
    return { error: error.response };
  }
};
