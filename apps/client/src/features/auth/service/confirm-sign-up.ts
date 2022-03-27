import { InferMutationOptions } from "../../../types/react-query";
import { Auth } from "aws-amplify";
import { useMutation } from "react-query";

type Data = {
  email: string;
  code: string;
};
async function confirmSignUpApi({ code, email }: Data) {
  return Auth.confirmSignUp(email, code);
}

function useConfirmSignUp(
  options?: InferMutationOptions<typeof confirmSignUpApi>
) {
  return useMutation(confirmSignUpApi, options);
}

export { useConfirmSignUp };
