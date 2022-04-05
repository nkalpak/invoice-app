import * as crypto from "crypto";

/*
 * Computes an HMAC given a payload and a key.
 *
 * Should be used to sign and verify webhooks
 */
function computeRequestSigningHmac(payload: string, key: string): string {
  return crypto
    .createHmac("SHA256", key)
    .update(JSON.stringify(payload))
    .digest("hex");
}

export { computeRequestSigningHmac };
