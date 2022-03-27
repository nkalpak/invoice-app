import { PageCard } from "../../../components/card";
import { TextField } from "../../../components/text-field";
import { PrimaryButton } from "../../../components/button";
import { SmallForm } from "../../../components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { createMachine, StateValue } from "xstate";
import { useMachine } from "@xstate/react";
import { AmplifyCodeVerification } from "./code-verification";
import { AuthService } from "../index";
import { useNavigate } from "@tanstack/react-location";
import { Routing } from "../../../utils/routing";
import { Box } from "theme-ui";
import { MdCheckCircle } from "react-icons/all";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const loginMachine = createMachine({
  schema: {
    context: {} as { error: Error },
    events: {} as
      | {
          type: "LOGIN_ATTEMPT";
        }
      | {
          type: "LOGIN_SUCCESS";
        }
      | {
          type: "LOGIN_FAIL";
        }
      | {
          type: "REQUIRES_VERIFICATION";
        }
      | {
          type: "VERIFY_ATTEMPT";
        }
      | {
          type: "VERIFY_SUCCESS";
        }
      | {
          type: "VERIFY_FAIL";
        },
  },
  id: "promise",
  initial: "resting",
  states: {
    resting: {
      on: {
        LOGIN_ATTEMPT: "attemptingLogin",
      },
    },
    attemptingLogin: {
      on: {
        LOGIN_SUCCESS: "loggedIn",
        LOGIN_FAIL: "resting",
        REQUIRES_VERIFICATION: "verification",
      },
    },
    loggedIn: {
      type: "final",
    },
    verification: {
      on: {
        VERIFY_ATTEMPT: "attemptingVerification",
      },
    },
    attemptingVerification: {
      on: {
        VERIFY_SUCCESS: "loggedIn",
        VERIFY_FAIL: "verification",
      },
    },
  },
});

const AMPLIFY_EXCEPTION = {
  USER_NOT_CONFIRMED: "UserNotConfirmedException",
  NOT_AUTHORIZED: "NotAuthorizedException",
};

function useRedirectToHome(loginMachineState: StateValue) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginMachineState === "loggedIn") {
      navigate({
        to: Routing.Home.path,
      });
    }
  }, [navigate, loginMachineState]);
}

export function Login() {
  const [state, send] = useMachine(loginMachine);
  const formMethods = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const signIn = AuthService.useSignIn({
    onMutate: () => send("LOGIN_ATTEMPT"),
    onSuccess() {
      send("LOGIN_SUCCESS");
    },
    onError: (error) => {
      // TODO: Fix any, can't bother right now
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      if (err.code === AMPLIFY_EXCEPTION.NOT_AUTHORIZED) {
        send("LOGIN_FAIL");
      } else if (err.code === AMPLIFY_EXCEPTION.USER_NOT_CONFIRMED) {
        send("REQUIRES_VERIFICATION");
      }
    },
  });

  useRedirectToHome(state.value);

  const showLoginForm =
    state.matches("resting") || state.matches("attemptingLogin");
  const showVerificationForm =
    state.matches("verification") || state.matches("attemptingVerification");

  return (
    <PageCard sx={{ width: "100%", position: "relative" }}>
      {state.matches("loggedIn") && (
        <Box sx={{ color: "success" }}>
          <MdCheckCircle size={24} />
        </Box>
      )}

      {showVerificationForm && (
        <AmplifyCodeVerification
          isLoading={state.matches("attemptingVerification")}
          username={formMethods.getValues("email")}
          onVerifyStart={() => send("VERIFY_ATTEMPT")}
          onVerifySuccess={() => send("VERIFY_SUCCESS")}
          onVerifyFail={() => {
            send("VERIFY_FAIL");
          }}
        />
      )}

      {showLoginForm && (
        <SmallForm
          sx={{ width: "100%" }}
          onSubmit={formMethods.handleSubmit(async (data) => {
            signIn.mutate({ email: data.email, password: data.password });
          })}
          title="Login"
          submitButton={
            <PrimaryButton
              isLoading={state.matches("attemptingLogin")}
              sx={{ width: "100%" }}
            >
              Login
            </PrimaryButton>
          }
        >
          <TextField
            label="Email"
            {...formMethods.register("email")}
            error={formMethods.formState.errors.email}
          />

          <TextField
            label="Password"
            type="password"
            {...formMethods.register("password")}
            error={formMethods.formState.errors.password}
          />
        </SmallForm>
      )}
    </PageCard>
  );
}
