import { PostConfirmationTriggerEvent } from "aws-lambda";
import { SecretsManager } from "aws-sdk";
import axios from "axios";
import { environment } from "./environment";
import { computeRequestSigningHmac } from "@invoicer/hmac";
import { InternalServerError, parseSecretManager } from "./utils";

const secretsManager = new SecretsManager();
const api = axios.create({
  baseURL: environment("API_SERVER_HOST"),
});

export const handler = async (
  event: PostConfirmationTriggerEvent
): Promise<PostConfirmationTriggerEvent> => {
  if (event.triggerSource !== "PostConfirmation_ConfirmSignUp") {
    return event;
  }

  const secrets = await secretsManager
    .getSecretValue({ SecretId: "cryptography" })
    .promise();
  if (secrets.SecretString === undefined) {
    throw new InternalServerError();
  }
  const { hmacSigningKey } = parseSecretManager(secrets.SecretString);

  const payload = {
    username: event.userName,
    email: event.request.userAttributes.email,
    timestamp: Date.now(),
  };

  await api.post("/auth/register-hook", payload, {
    headers: {
      "Invoicer-Signature": computeRequestSigningHmac(
        JSON.stringify(payload),
        hmacSigningKey
      ),
    },
  });

  return event;
};
