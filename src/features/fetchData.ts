
// fetch typed
export interface HttpResponse<T> extends Response {
  parsedBody?: T
}

interface FetchConfig {
  body?: string;
  method: string;
  headers?: { [key: string] : string; }
}

export async function http<T>(request: RequestInfo, {
  body,
  ...customConfig }: FetchConfig): Promise<HttpResponse<T>> {

  const headers = { 'Content-Type': 'application/json' };
  const config: FetchConfig = {
    body,
    ...customConfig,
    headers: {
      ...headers,
    }
  };
  if (body) {
    console.log("The body" + config.body);
    config.method = 'POST';
  }
  console.log(config);
  try {
    //const response: Response = await fetch(request, config);
    const response: HttpResponse<T> = await fetch(request, config);
    response.parsedBody = await response.json();
    if (response.ok) {
      return response;
    }
    console.log("err " + response.statusText);

    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : "");
  }
}