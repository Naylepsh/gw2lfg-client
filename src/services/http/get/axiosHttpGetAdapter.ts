import axios, { AxiosResponse } from "axios";
import { handleRequestError } from "../handleRequestError";
import { HttpGet, HttpGetOptions } from "./httpGetType";

/**
 * Adapter around axios get method.
 */
export const axiosHttpGetAdapter: HttpGet = async function <ResponseType>(
  url: string,
  config?: HttpGetOptions
): Promise<ResponseType> {
  try {
    const response = await axios.get<ResponseType>(url, config);
    return response.data;
  } catch (error) {
    handleRequestError(error.response as AxiosResponse);
    throw error;
  }
};
