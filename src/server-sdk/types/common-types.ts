export type ApiResponseBody<TResult> = {
  request_id: string;
  errcode: number;
  errmsg: string;
  result: TResult;
};
