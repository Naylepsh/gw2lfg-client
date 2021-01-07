import { HttpErrorResponse } from "./httpErrorResponse";

export interface HttpResponse<SuccessfulResponseType> {
  data?: SuccessfulResponseType;
  error?: HttpErrorResponse;
}
