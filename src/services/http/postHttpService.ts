import axios from "axios";

export async function httpPost<DataType, ResponseType>(
  url: string,
  data: DataType
): Promise<ResponseType> {
  const response = await axios.post<ResponseType>(url, data);
  return response.data;
}
