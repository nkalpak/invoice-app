import { Label } from "theme-ui";
import { Typography } from "./typography";
import React, { PropsWithChildren } from "react";

type FormControlError = {
  message?: string | undefined;
};

export type FormControlProps = PropsWithChildren<{
  label: string;
  error?: FormControlError;
}>;

export function FormControl({ label, children, error }: FormControlProps) {
  return (
    <Label
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Typography sx={{ color: "label" }} as="span" variant="body2">
        {label}
      </Typography>

      {children}

      {error ? (
        <Typography variant="body2" sx={{ color: "danger" }}>
          {error.message}
        </Typography>
      ) : null}
    </Label>
  );
}
