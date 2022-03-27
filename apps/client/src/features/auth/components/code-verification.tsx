import React from "react";
import { Box, Input } from "theme-ui";
import { createArray } from "../../../utils/common";
import { Typography } from "../../../components/typography";
import { PrimaryButton } from "../../../components/button";
import { AuthService } from "../index";

function VerificationForm({
  onChange,
  isDisabled = false,
  hasError = false,
}: {
  onChange: (code: string, isComplete: boolean) => void;
  isDisabled?: boolean;
  hasError?: boolean;
}) {
  const CODE_LENGTH = 6;
  const [code, setCode] = React.useState("");

  function onCodeCharacterAdd(value: string, index: number) {
    const newCode = [code.slice(0, index), value, code.slice(index + 1)].join(
      ""
    );
    onChange(newCode, newCode.length === CODE_LENGTH);
    setCode(newCode);
  }

  return (
    <Box
      sx={{
        gap: 4,
        display: "flex",
        "& > *": {
          flexGrow: 1,
        },
      }}
    >
      {createArray(CODE_LENGTH).map((value, index) => (
        <VerificationInput
          autoFocus={index === 0}
          hasError={hasError}
          isDisabled={isDisabled}
          key={index}
          onChange={(event) => onCodeCharacterAdd(event, index)}
        />
      ))}
    </Box>
  );
}

function VerificationInput({
  onChange,
  isDisabled,
  hasError,
  autoFocus,
}: {
  onChange: (value: string) => void;
  isDisabled?: boolean;
  hasError?: boolean;
  autoFocus: boolean;
}) {
  const [value, setValue] = React.useState("");

  function setSelectionAtEnd(target: EventTarget) {
    // @ts-expect-error We know that the target is always an Input element
    target?.setSelectionRange(target.value.length, target.value.length);
  }

  return (
    <Input
      autoFocus={autoFocus}
      disabled={isDisabled}
      value={value}
      onClick={(event) => {
        setSelectionAtEnd(event.target);
      }}
      onFocus={(event) => {
        setSelectionAtEnd(event.target);
      }}
      onChange={(event) => {
        const value = event.target.value;
        const oneCharacter =
          value.length === 1 ? value : value[value.length - 1] ?? "";

        if (value !== "") {
          // @ts-ignore
          document.activeElement?.nextElementSibling?.focus();
        }

        onChange?.(oneCharacter);
        setValue(oneCharacter);
      }}
      sx={{
        p: 0,
        textAlign: "center",
        ...(hasError && { borderColor: "danger" }),
      }}
    />
  );
}

function AmplifyCodeVerification({
  username,
  onVerifyStart,
  onVerifySuccess,
  onVerifyFail,
  isLoading,
}: {
  isLoading: boolean;
  username: string;
  onVerifyStart: () => void;
  onVerifySuccess: () => void;
  onVerifyFail: (error: Error) => void;
}) {
  const [code, setCode] = React.useState("");
  const [hasAttempted, setHasAttempted] = React.useState(false);

  const confirmSignUp = AuthService.useConfirmSignUp({
    onSuccess: onVerifySuccess,
    onError: onVerifyFail,
    onMutate: onVerifyStart,
    onSettled: () => {
      setHasAttempted(true);
    },
  });

  async function onSubmit(code: string) {
    confirmSignUp.mutate({ code, email: username });
  }

  async function onChange(newCode: string, isComplete: boolean) {
    setCode(newCode);
    if (isComplete && !hasAttempted) {
      await onSubmit(newCode);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: 300,
      }}
    >
      <Box>
        <VerificationForm
          // eslint-disable-next-line eqeqeq
          hasError={confirmSignUp.error != undefined}
          isDisabled={isLoading}
          onChange={onChange}
        />
        {confirmSignUp.error && (
          <Typography variant="body2" sx={{ color: "danger", mt: 2 }}>
            {confirmSignUp.error.message}
          </Typography>
        )}
      </Box>

      <PrimaryButton onClick={() => onSubmit(code)} isLoading={isLoading}>
        Verify
      </PrimaryButton>
    </Box>
  );
}

export { AmplifyCodeVerification };
