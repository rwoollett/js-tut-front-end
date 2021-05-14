// export interface HttpResponse<T> extends Response {
//   parsedBody?: T
// }

interface FetchConfig {
  body?: string;
  method: string;
  headers?: { [key: string]: string; }
}

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
  try {
    const response = await fetch(request, config);
    return response.json();
  } catch (err) {
    console.log(err);
    return Promise.reject(err.message ? err.message : "");
  }
}