import { Auth } from "aws-amplify";
import { useQuery } from "react-query";
import { authKeys } from "./keys";

async function currentUserApi(): Promise<CurrentAuthenticatedUser> {
  return Auth.currentAuthenticatedUser();
}

function useCurrentUser() {
  return useQuery(authKeys.currentUser, currentUserApi);
}

type CurrentAuthenticatedUser = {
  storage: Record<string, string>;
  attributes: {
    sub: string;
    "custom:avatar_color": string;
    phone_number: string;
    given_name: string;
    family_name: string;
    email: string;
  };
  signInUserSession: {
    idToken: {
      jwtToken: string;
      payload: {
        super_admin: "true" | "false";
        tenant_subdomain: string;
        tenant_id: string;
        sub: string;
        "custom:avatar_color": string;
        role: string;
        iss: string;
        "cognito:username": string;
        given_name: string;
        aud: string;
        event_id: string;
        token_use: string;
        auth_time: number;
        phone_number: string;
        exp: number;
        iat: number;
        family_name: string;
        email: string;
      };
    };
    refreshToken: {
      token: string;
    };
  };
};

export { useCurrentUser };
