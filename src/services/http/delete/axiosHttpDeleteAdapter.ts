import axios, { AxiosResponse } from "axios";
import { HttpResponse } from "../httpResponse";
import { HttpDeleteOptions, HttpDelete } from "./httpDeleteType";
import { handleRequestError } from "../handleRequestError";

/**
 * Adapter around axios delete method.
 * On request success saves data to data field.
 * On requst failure saves error to error field.
 */
export const axiosHttpDeleteAdapter: HttpDelete = async function <ResponseType>(
  url: string,
  config?: HttpDeleteOptions
): Promise<HttpResponse<ResponseType>> {
  try {
    const response = await axios.delete<ResponseType>(url, config);
    return { data: response.data };
  } catch (error) {
    handleRequestError(error.response as AxiosResponse);
    return { error: error.response };
  }
};
