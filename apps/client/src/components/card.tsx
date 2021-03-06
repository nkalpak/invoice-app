import * as ThemeUi from "theme-ui";
import React from "react";
import { MdError } from "react-icons/md";
import { Box } from "theme-ui";

export function Card(props: ThemeUi.CardProps) {
  return (
    <ThemeUi.Card
      sx={{
        px: 2,
        py: 4,
        boxShadow: "0 10px 10px -10px rgba(72, 84, 159, 0.1)",
        borderRadius: 1,
      }}
      {...props}
    >
      {props.children}
    </ThemeUi.Card>
  );
}

/*
 * Used when the only element on the page is this card.
 *
 * Examples include the login and register forms which are wrapped by a `PageCard`
 */
export function PageCard(props: ThemeUi.CardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "white",
        height: "80%",
        minHeight: 500,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {props.children}
    </Card>
  );
}

export function DangerCard(props: ThemeUi.CardProps) {
  return (
    <Card
      sx={{
        border: "2px solid",
        borderColor: "danger",
        color: "danger",
        px: 4,
        mb: 6,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...props}
    >
      {props.children}

      <Box sx={{ ml: 4 }}>
        <MdError sx={{ color: "danger" }} />
      </Box>
    </Card>
  );
}
