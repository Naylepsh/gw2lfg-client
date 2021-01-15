import axios from "axios";
import { HttpGet, HttpGetOptions } from "./httpGetType";

/* 
Adapter around axios get method.
*/
export const axiosHttpGetAdapter: HttpGet = async function <ResponseType>(
  url: string,
  config?: HttpGetOptions
): Promise<ResponseType> {
  const response = await axios.get<ResponseType>(url, config);
  return response.data;
}
