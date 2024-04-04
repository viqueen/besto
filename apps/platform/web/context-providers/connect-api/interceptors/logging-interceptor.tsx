import {
  Interceptor,
  StreamRequest,
  StreamResponse,
  UnaryRequest,
  UnaryResponse,
} from "@connectrpc/connect";

type nextFn = (
  req: UnaryRequest | StreamRequest,
) => Promise<UnaryResponse | StreamResponse>;
const loggingInterceptor = (): Interceptor => {
  return (next: nextFn): nextFn => {
    return async (
      req: UnaryRequest | StreamRequest,
    ): Promise<UnaryResponse | StreamResponse> => {
      console.log("Request", req);
      return next(req)
        .then((res) => {
          console.log("Response", res);
          return res;
        })
        .catch((err) => {
          console.error("** in here", err);
          throw err;
        });
    };
  };
};

export { loggingInterceptor };
