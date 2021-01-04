import axios from "axios";

export interface HttpPutOptions {
  headers: any;
}

export async function httpPut<DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPutOptions
): Promise<ResponseType> {
  const response = await axios.put<ResponseType>(url, data, config);
  return response.data;
}
