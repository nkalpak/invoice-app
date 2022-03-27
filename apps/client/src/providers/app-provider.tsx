import { EmptyPropsWithChildren } from "../types/react";
import { RollbarProvider } from "../lib/rollbar";
import React from "react";
import { ModalContainer } from "../features/modal/modal-container";
import { ReactLocationProvider } from "../lib/react-location";
import { ThemeUiProvider } from "../lib/theme-ui";
import { ReactQueryProvider } from "../lib/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";

function AppProvider({ children }: EmptyPropsWithChildren) {
  return (
    <RollbarProvider>
      <ThemeUiProvider>
        <ReactQueryProvider>
          <ReactLocationProvider>
            <React.Fragment>{children}</React.Fragment>
            <ModalContainer />
            <ReactQueryDevtools />
            <ReactLocationDevtools position="bottom-right" />
          </ReactLocationProvider>
        </ReactQueryProvider>
      </ThemeUiProvider>
    </RollbarProvider>
  );
}

export { AppProvider };
