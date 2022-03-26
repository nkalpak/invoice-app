import { Text, TextProps, ThemeUICSSProperties } from "theme-ui";
import React from "react";

type TypographyVariant =
  | "headline1"
  | "headline2"
  | "headline3"
  | "headline4"
  | "body1"
  | "body2";
type TypographyProps = Omit<TextProps, "variant"> & {
  variant: TypographyVariant;
};

const VARIANT_STYLES: Record<TypographyVariant, ThemeUICSSProperties> = {
  body1: {
    fontFamily: "body",
    fontWeight: "medium",
    fontSize: `${12 / 16}rem`,
    lineHeight: "15px",
    letterSpacing: -0.25,
  },
  body2: {
    fontFamily: "body",
    fontWeight: "medium",
    fontSize: `${11 / 16}rem`,
    lineHeight: "18px",
    letterSpacing: -0.23,
  },
  headline1: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: `${32 / 16}rem`,
    lineHeight: "36px",
    letterSpacing: -1,
  },
  headline2: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: `${20 / 16}rem`,
    lineHeight: "22px",
    letterSpacing: -0.63,
  },
  headline3: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: `${16 / 16}rem`,
    lineHeight: "24px",
    letterSpacing: -0.68,
  },
  headline4: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: `${12 / 16}rem`,
    lineHeight: "15px",
    letterSpacing: -0.25,
  },
};

const VARIANT_ELEMENT: Record<TypographyVariant, keyof React.ReactHTML> = {
  body1: "p",
  body2: "p",
  headline1: "h1",
  headline2: "h2",
  headline3: "h3",
  headline4: "h4",
};

/*
 * Component which should cover 80% of all typography uses.
 *
 * Uses the [Material type system](https://material.io/design/typography/the-type-system.html#type-scale).
 * Feel free to create your own type system, though keep in mind that it
 * should cover at least 80% of the typography uses in the project.
 */
function Typography({ variant, sx, ...props }: TypographyProps) {
  const as = VARIANT_ELEMENT[variant];
  const styles = VARIANT_STYLES[variant];

  return (
    <Text
      as={as}
      {...props}
      sx={{
        ...sx,
        ...styles,
      }}
    />
  );
}

export { Typography };
