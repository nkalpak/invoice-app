import { EmptyPropsWithChildren } from "../types/react";
import { Theme, ThemeProvider, ThemeUIStyleObject } from "theme-ui";

const formControlStyles: ThemeUIStyleObject = {
  height: `${48 / 16}rem`,
  px: 5,
  lineHeight: 1.25,
  fontFamily: "body",
  fontSize: `${12 / 16}rem`,
  fontWeight: "bold",

  backgroundColor: "controlBackground",
  color: "controlText",
  border: "1px solid",
  borderColor: "controlBorder",

  "&:active, &:focus": {
    borderColor: "controlActive",
    outline: "none",
  },
};

const theme: Theme = {
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
  },
  forms: {
    input: formControlStyles,
  },
  config: {
    initialColorModeName: "light",
  },
  fonts: {
    body: "Spartan, sans-serif",
    heading: "Spartan, sans-serif",
  },
  radii: {
    0: "4px",
    1: "8px",
  },
  colors: {
    danger: "#EC5757",
    primary: "#7C5DFA",

    label: "#7E88C3",
    controlBorder: "#DFE3FA",
    controlBackground: "#FFFFFF",
    controlText: "#0C0E16",
    controlActive: "#9277FF",

    modes: {
      dark: {
        label: "#DFE3FA",
        controlBorder: "#252945",
        controlBackground: "#1E2139",
        controlText: "#FFFFFF",
        controlActive: "#9277FF",
      },
    },
  },
};

export function ThemeUiProvider({ children }: EmptyPropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
