// export interface HttpResponse<T> extends Response {
//   parsedBody?: T
// }

interface FetchConfig {
  body?: string;
  method: string;
  headers?: { [key: string]: string; }
}
interface IError {
  message: string;
}

const handleError = function (err: IError) {
  console.warn(err);
  return new Response(JSON.stringify({
    code: 400,
    message: 'Stupid network Error'
  }));
};

export async function http<T>(request: string, {
  body,
  ...customConfig }: FetchConfig): Promise<T> {

  const headers = { 'Content-Type': 'application/json' };
  const config: FetchConfig = {
    body,
    ...customConfig,
    headers: {
      ...headers,
    }
  };
  console.log(config);

  // Get the request
  const response = await (fetch(request, config).catch(handleError));
  if (response.ok) {
    //console.log("RESPONSE:" + response.json());
    return response.json();
  } else {
    return Promise.reject(response);
  }
  // try {
  //   const response = await fetch(request, config);
  //   return response.json();
  // } catch (err: string ) {
  //   console.log(err);
  //   return Promise.reject(err.message ? err.message : "");
  // }

}