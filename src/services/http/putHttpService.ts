import axios from "axios";
import { HttpResponse } from "./httpResponse";

export interface HttpPutOptions {
  headers: any;
}

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
