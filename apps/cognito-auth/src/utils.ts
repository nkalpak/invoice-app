import { z } from "zod";

class InternalServerError extends Error {
  public constructor() {
    super();
    this.name = "InternalServerError";
  }
}

const SecretsManagerParser = z.object({
  hmacSigningKey: z.string(),
});

function parseSecretManager(
  secretString: string
): z.infer<typeof SecretsManagerParser> {
  const result = SecretsManagerParser.safeParse(JSON.parse(secretString));
  if (!result.success) {
    throw new InternalServerError();
  }
  return result.data;
}

export { parseSecretManager, InternalServerError };
