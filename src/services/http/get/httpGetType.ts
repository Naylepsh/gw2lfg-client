export interface HttpGetOptions {
  headers: any;
}

/*
To properly integrate with React Query, this type cannot work the same as other mutating wrapped http methods do.
Wrapping it with HttpResponse would require to throw on error to use ReactQuery isError methods and so on.
I don't think increasing consitency is worth having to deal with React Query antics in this case.
Especially since queries and mutations in react query already have different APIs anyway.
*/
export type HttpGet = <ResponseType>(
  url: string,
  config?: HttpGetOptions
) => Promise<ResponseType>;
