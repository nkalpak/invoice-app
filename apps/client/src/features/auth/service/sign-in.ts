import { Auth } from "aws-amplify";
import { InferMutationOptions } from "../../../types/react-query";
import { useMutation, useQueryClient } from "react-query";
import { authKeys } from "./keys";

type Data = {
  email: string;
  password: string;
};

async function signInApi({ password, email }: Data) {
  return Auth.signIn(email, password);
}

function useSignIn(options?: InferMutationOptions<typeof signInApi>) {
  const queryClient = useQueryClient();
  return useMutation(signInApi, {
    ...options,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(authKeys.currentUser);
      await options?.onSuccess?.(data, variables, context);
    },
  });
}

export { useSignIn };
