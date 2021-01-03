import axios from "axios";

export interface HttpPostOptions {
  headers: any;
}

export async function httpPost<DataType, ResponseType>(
  url: string,
  data: DataType,
  config?: HttpPostOptions
): Promise<ResponseType> {
  const response = await axios.post<ResponseType>(url, data, config);
  return response.data;
}
