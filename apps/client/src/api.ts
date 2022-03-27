import { DefaultApiFp } from "@invoicer/api";
import { config } from "./utils/config";
import axios, { AxiosInstance, AxiosPromise } from "axios";

const api = DefaultApiFp({
  basePath: config("VITE_BACKEND_URL"),
  isJsonMime: (mime: string) => {
    const jsonMime = new RegExp(
      // eslint-disable-next-line no-control-regex
      "^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$",
      "i"
    );
    return (
      mime !== null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === "application/json-patch+json")
    );
  },
});

const axiosInstance = axios.create({
  baseURL: config("VITE_BACKEND_URL"),
});

export function makeRequest<T>(
  apiCallPromise: Promise<(axios?: AxiosInstance) => AxiosPromise<T>>
): Promise<T>;
export function makeRequest<T, Data>(
  apiCallPromise: Promise<(axios?: AxiosInstance) => AxiosPromise<T>>,
  mapData?: (data: T) => Data
): Promise<Data>;
export function makeRequest<T, Data>(
  apiCallPromise: Promise<(axios?: AxiosInstance) => AxiosPromise<T>>,
  mapData?: (data: T) => Data
) {
  return new Promise((resolve, reject) => {
    apiCallPromise
      .then(async (apiCall) => {
        try {
          const { data } = await apiCall(axiosInstance);
          resolve(mapData ? mapData(data) : data);
        } catch (error) {
          if (error instanceof Error) {
            reject(error);
          }
        }
      })
      .catch((reason) => reject(reason));
  });
}

export { api };
