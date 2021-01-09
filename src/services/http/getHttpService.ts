import axios from "axios";

export interface HttpGetOptions {
  headers: any;
}

/* 
Wrapper around axios get method.
To properly integrate with React Query, this function cannot work the same as other mutating wrapped http methods do.
Wrapping it with HttpResponse would require to throw on error to use ReactQuery isError methods and so on.
I don't think increasing consitency is worth having to deal with React Query antics in this case.
Especially since queries and mutations in react query already have different APIs anyway.
*/
export async function httpGet<ResponseType>(
  url: string,
  config?: HttpGetOptions
): Promise<ResponseType> {
  const response = await axios.get<ResponseType>(url, config);
  return response.data;
}
