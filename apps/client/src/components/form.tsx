import * as ThemeUi from "theme-ui";
import { Box } from "theme-ui";
import React from "react";
import { Typography } from "./typography";
import { DangerCard } from "./card";

type FormProps = ThemeUi.BoxProps & {
  submitButton: React.ReactChild;
  title?: string;
  error?: string;
};

export function Form({
  children,
  submitButton,
  title,
  error,
  ...props
}: FormProps) {
  return (
    <Box
      as="form"
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="headline2" sx={{ mb: 4 }}>
        {title}
      </Typography>

      {children}

      <Box sx={{ mt: 6 }}>
        {error && (
          <DangerCard>
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              {error}
            </Typography>
          </DangerCard>
        )}

        {React.isValidElement(submitButton)
          ? React.cloneElement(submitButton, { type: "submit" })
          : null}
      </Box>
    </Box>
  );
}

export function SmallForm(props: FormProps) {
  return (
    <Form
      {...props}
      sx={{
        maxWidth: 480,
        px: 6,
        mx: "auto",
      }}
    >
      {props.children}
    </Form>
  );
}
