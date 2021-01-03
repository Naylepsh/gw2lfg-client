import axios from "axios";

export interface HttpGetOptions {
  headers: any;
}

export async function httpGet<ResponseType>(
  url: string,
  config?: HttpGetOptions
): Promise<ResponseType> {
  const response = await axios.get<ResponseType>(url, config);
  return response.data;
}
