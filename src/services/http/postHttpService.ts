import axios from "axios";
import { HttpResponse } from "./httpResponse";

export interface HttpPostOptions {
  headers: any;
}

export async function httpPost<DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPostOptions
): Promise<HttpResponse<ResponseType>> {
  try {
    const response = await axios.post<ResponseType>(url, data, config);
    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
}
