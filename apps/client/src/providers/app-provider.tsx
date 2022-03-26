import { EmptyPropsWithChildren } from "../types/react";
import { RollbarProvider } from "../lib/rollbar";
import React from "react";
import { ModalContainer } from "../features/modal/modal-container";
import { ReactLocationProvider } from "../lib/react-location";
import { ThemeUiProvider } from "../lib/theme-ui";

function AppProvider({ children }: EmptyPropsWithChildren) {
  return (
    <RollbarProvider>
      <ReactLocationProvider>
        <ThemeUiProvider>
          <React.Fragment>{children}</React.Fragment>
          <ModalContainer />
        </ThemeUiProvider>
      </ReactLocationProvider>
    </RollbarProvider>
  );
}

export { AppProvider };
