import React from "react";
import { Login } from "../components/login";
import { MaxWidthWrapper } from "../../../components/max-width-wrapper";

export function LoginPage() {
  return (
    <MaxWidthWrapper
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Login />
    </MaxWidthWrapper>
  );
}
