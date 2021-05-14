//import axios, {AxiosResponse} from 'axios';

// fetch typed
export interface HttpResponse<T> extends Response {
  parsedBody?: T
}

interface FetchConfig {
  body?: string;
  method: string;
  headers?: { [key: string]: string; }
}

export async function http<T>(request: string, {
  body,
  ...customConfig }: FetchConfig): Promise<T> {
  // const client = axios.create(
  //   {
  //     baseURL: '/'
  //   });

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
    // let response:AxiosResponse<T>;
    // if (body) {
    //   console.log("The body" + body);
    //   //config.method = "POST";
    //   response = await client.post(request, body, {headers: {'Content-Type':'application/json'}});
    // } else {
    //   response = await client.get(request);
    // }

    // return response.data;
    // //try {
    // //const response: Response = await fetch(request, config);


    if (body) {
      console.log("The body" + body);
      config.method = "POST";
      //response = await client.post(request, body, {headers: {'Content-Type':'application/json'}});
    }
    const response = await fetch(request, config);
    return response.json();
    // response.parsedBody = await response.json();
    // if (response.ok) {
    //   return response;
    // }
    // console.log("err " + response.statusText);

    // throw new Error(response.statusText);
  } catch (err) {
    console.log(err);
    return Promise.reject(err.message ? err.message : "");
  }
}