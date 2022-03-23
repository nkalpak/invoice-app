import { DefaultApiFp } from "@invoicer/api";
import { config } from "./utils/config";

const api = DefaultApiFp({
  basePath: config("VITE_BACKEND_URL"),
  isJsonMime: (mime: string) => {
    const jsonMime = new RegExp(
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

export { api };
