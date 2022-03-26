import { EmptyPropsWithChildren } from "../types/react";
import { Theme, ThemeProvider } from "theme-ui";

const theme: Theme = {
  fonts: {
    body: "Spartan, sans-serif",
    heading: "Spartan, sans-serif",
  },
};

export function ThemeUiProvider({ children }: EmptyPropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
