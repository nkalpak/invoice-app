import * as ThemeUi from "theme-ui";
import { Box } from "theme-ui";
import React from "react";
import { Typography } from "./typography";

type FormProps = ThemeUi.BoxProps & {
  SubmitButton: React.ReactChild;
  title?: string;
};

export function Form({ children, SubmitButton, title, ...props }: FormProps) {
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
        {React.isValidElement(SubmitButton)
          ? React.cloneElement(SubmitButton, { type: "submit" })
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
