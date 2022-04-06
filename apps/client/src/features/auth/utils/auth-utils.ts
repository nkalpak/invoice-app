import { Auth } from "aws-amplify";

class InvalidSessionError extends Error {
  public constructor() {
    super();
    this.name = "InvalidSessionError";
    this.message = "The current session is invalid";
  }
}

const AMPLIFY_ERROR = {
  NO_CURRENT_USER: "No current user",
};

const AMPLIFY_EXCEPTION = {
  USER_NOT_CONFIRMED: "UserNotConfirmedException",
  NOT_AUTHORIZED: "NotAuthorizedException",
};

async function getCurrentSessionTokens() {
  const session = await Auth.currentSession();

  if (!session.isValid()) {
    throw new InvalidSessionError();
  }

  const idToken = session.getIdToken().getJwtToken();
  const accessToken = session.getAccessToken().getJwtToken();
  const refreshToken = session.getRefreshToken().getToken();

  return {
    idToken,
    accessToken,
    refreshToken,
  };
}

export { getCurrentSessionTokens, AMPLIFY_EXCEPTION, AMPLIFY_ERROR };
