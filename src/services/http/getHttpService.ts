import axios from "axios";


export interface HTTPGetOptions {
  headers: any
}

export async function httpGet<ResponseType>(
  url: string,
  config?: HTTPGetOptions
): Promise<ResponseType> {
  const response = await axios.get<ResponseType>(url, config);
  return response.data;
}
