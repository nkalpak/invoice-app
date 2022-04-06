import { Input, InputProps } from "theme-ui";
import React from "react";
import { FormControl, FormControlProps } from "./form-control";

type TextFieldProps = InputProps & Pick<FormControlProps, "error" | "label">;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <FormControl label={label} error={error}>
        <Input
          {...props}
          ref={ref}
          sx={{
            "&:-webkit-autofill,&-webkit-autofill:hover,&-webkit-autofill:focus,&-webkit-autofill:active":
              {
                transitionDelay: "9999s",
                transitionProperty: "background-color",
              },
          }}
        />
      </FormControl>
    );
  }
);
