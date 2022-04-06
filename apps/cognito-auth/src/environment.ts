import { z } from "zod";

type ConfigSchemaType = z.infer<typeof ConfigSchema>;
const ConfigSchema = z.object({
  API_SERVER_HOST: z.string(),
});

// @ts-expect-error This is a "late" initialized variable, but since
//  there is no such concept in JS, this will do.
let configCache: ConfigSchemaType = undefined;

function environment(): ConfigSchemaType;
function environment<TKey extends keyof ConfigSchemaType>(
  key: TKey
): ConfigSchemaType[TKey];
function environment<TKey extends keyof ConfigSchemaType>(
  key?: TKey
): ConfigSchemaType | ConfigSchemaType[TKey] {
  // eslint-disable-next-line eqeqeq
  if (configCache != undefined) {
    return key ? configCache[key] : configCache;
  }

  const result = ConfigSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  configCache = result.data;
  return key ? result.data[key] : result.data;
}

environment();

export { environment };
