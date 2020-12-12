import axios from "axios";

export async function httpGet<ResponseType>(
  url: string
): Promise<ResponseType> {
  const response = await axios.get<ResponseType>(url);
  return response.data;
}
