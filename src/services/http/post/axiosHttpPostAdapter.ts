import axios, { AxiosResponse } from "axios";
import { handleRequestError } from "../handleRequestError";
import { HttpResponse } from "../httpResponse";
import { HttpPost, HttpPostOptions } from "./httpPostType";

/**
 * Adapter around axios POST method.
 * On request success saves data to data field.
 * On requst failure saves error to error field.
 */
export const axiosHttpPostAdapter: HttpPost = async function <
  DataType,
  ResponseType
>(
  url: string,
  data: DataType,
  config?: HttpPostOptions
): Promise<HttpResponse<ResponseType>> {
  try {
    const response = await axios.post<ResponseType>(url, data, config);
    return { data: response.data };
  } catch (error) {
    handleRequestError(error.response as AxiosResponse);
    return { error: error.response };
  }
};
